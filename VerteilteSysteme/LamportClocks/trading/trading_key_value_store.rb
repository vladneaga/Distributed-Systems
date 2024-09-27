require "./server.rb"

# create servers
server1 = Server.new("server1")
server2 = Server.new("server2")

# write operations on server1
op1 = server1.write("key1", "value1")
server2.receive(op1)

# concurrent write operations
op2 = server1.write("key2", "value2")
op3 = server2.write("key3", "value3")

# operations are broadcasted
server2.receive(op2)
server1.receive(op3)

# read operations
puts "\nReading values from servers:"
puts "Server1 - key1: #{server1.read("key1")}"
puts "Server1 - key2: #{server1.read("key2")}"
puts "Server1 - key3: #{server1.read("key3")}"
puts "Server2 - key1: #{server2.read("key1")}"
puts "Server2 - key2: #{server2.read("key2")}"
puts "Server2 - key3: #{server2.read("key3")}"

# collect all operations in a random order
puts "\nOperations in random order:"
operations = [op1, op2, op3].shuffle
operations.each { |op| puts op }

# order them by their lamport timestamp
puts "\nOperations in timestamp order:"
operations = LamportClock.sort(operations)
operations.each { |op| puts op }