require "./vector_clock.rb"

class Participant
  attr_reader :id, :store

  def initialize(id)
    @id = id
    @clock = VectorClock.new(@id)
    @store = {}
  end

  def receive_update(update)
    @clock.update(update[:timestamp])
    @store[update[:key]] = { value: update[:value], timestamp: @clock.timestamp }
    puts "-> #{@id} received update for key '#{update[:key]}' with timestamp #{update[:timestamp]}, updated local timestamp #{@clock.timestamp}"
  end

  def put(key, value)
    @clock.tick
    timestamp = @clock.timestamp
    @store[key] = { value: value, timestamp: timestamp }
    puts "\n#{@id} put key '#{key}' with value '#{value}' at local timestamp #{timestamp}"
    { by: @id, key: key, value: value, timestamp: timestamp }
  end

  def get(key)
    entry = @store[key]
    if entry
      puts "\n#{@id} get key '#{key}' with value '#{entry[:value]}' and timestamp #{entry[:timestamp]}"
      entry[:value]
    else
      puts "\n#{@id} get key '#{key}' not found"
      nil
    end
  end
end