const net = require("net");

class Request {
    constructor(method, headers, body = "") {
        this.method = method;
        this.headers = headers;
        this.body = body;
    }

    toString() {
        let headersString = Object.entries(this.headers)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\r\n");

        return `${this.method} / HTTP/1.1\r\n${headersString}\r\n\r\n${this.body}`;
    }
}

class Response {
    constructor(socket) {
        this.socket = socket;
        this.status = null;
        this.headers = {};
        this.body = "";
        this.headersReceived = false;
    }

    parseHeader(header) {
        if (!this.headersReceived) {
            const [statusLine, ...headerLines] = header.split("\r\n");
            this.status = statusLine;
            headerLines.forEach(line => {
                const [key, value] = line.split(": ");
                this.headers[key] = value;
            });
            this.headersReceived = true;
        }
    }

    onData(data) {
        const dataString = data.toString();
        if (!this.headersReceived && dataString.includes("\r\n\r\n")) {
            const [header, body] = dataString.split("\r\n\r\n");
            this.parseHeader(header);
            this.body += body;
        } else if (this.headersReceived) {
            this.body += dataString;
        } else {
            this.parseHeader(dataString);
        }
    }

    onComplete(callback) {
        this.socket.on("data", data => this.onData(data));
        this.socket.on("end", () => callback(this));
    }
}

function request(url, headers, body) {
    const [host, port] = url.split(":");
    const client = net.createConnection({ host, port });

    const request = new Request("GET", headers, body);

    return new Promise((resolve, reject) => {
        client.on("connect", () => {
            client.write(request.toString());
        });

        const response = new Response(client);
        response.onComplete(resolve);
    });
}


const url = "127.0.0.1:8000";
const headers = { Host: "127.0.0.1", Accept: "text/html", Connection: "keep-alive" };
const body = "";

request(url, headers, body)
    .then(response => {
        console.log("Received response:");
        console.log(response.status);
        console.log(response.headers);
        console.log(response.body);
    })
    .catch(error => {
        console.error("Error:", error);
    });