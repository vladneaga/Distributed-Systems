require "./lamport_clock.rb"

class Server
  attr_reader :id, :store

  def initialize(id)
    @id = id
    @clock = LamportClock.new
    @store = {}
  end

  def receive(operation)
    @clock.update(operation[:timestamp])
    key, value = operation[:key], operation[:value]
    @store[key] = { value: value, timestamp: operation[:timestamp] }
    puts "-> #{@id} received operation #{operation}, updated local timestamp #{@clock.timestamp}, store: #{@store}"
  end

  def write(key, value)
    @clock.tick
    operation = { key: key, value: value, timestamp: @clock.timestamp, by: @id }
    @store[key] = { value: value, timestamp: @clock.timestamp }
    puts "\n#{@id} wrote #{key}: #{value} at local timestamp #{@clock.timestamp}"
    operation
  end

  def read(key)
    @store[key]
  end
end