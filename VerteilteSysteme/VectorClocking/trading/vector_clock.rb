class VectorClock
  attr_reader :id, :timestamp

  def initialize(id)
    @id = id
    @timestamp = {}
    @timestamp[@id] = 0
  end

  # Advance own timestamp
  def tick
    @timestamp = @timestamp.clone
    @timestamp[@id] += 1
  end

  # Merge incoming timestamp and take max values
  def update(incoming_timestamp)
    @timestamp = @timestamp.merge(incoming_timestamp) do |id, v1, v2|
      [v1, v2].max
    end
    tick
  end

  # Compare two vectors
  def self.compare(a, b)
    # a == b => 0
    return 0 if a == b
    # No history shared
    if (a.keys & b.keys).empty?
      raise "#{a} and #{b} don't share any history and cannot be compared"
    end
    # Collect all keys from both vectors
    ids = (a.keys + b.keys).uniq
    # Combine them into matched pairs
    pairs = ids.map do |id|
      [a[id] || 0, b[id] || 0]
    end
    # Condition: each element of a <= b
    less_or_equal = pairs.all? { |pair| pair[0] <= pair[1] }
    
    # Condition: at least one element of a < b
    less = pairs.any? { |pair| pair[0] < pair[1] }
    # a, b => -1
    return -1 if less_or_equal && less
    # Is a concurrent with b?
    less = pairs.any? { |pair| pair[0] < pair[1] }
    greater = pairs.any? { |pair| pair[0] > pair[1] }
    if less && greater
      return nil # Indicate concurrency
    end
    
    # b, a => 1
    1
  end

  # Sort a list of events by their timestamp vectors
  def self.sort(events)
    events.sort do |e1, e2|
      comparison = compare(e1[:timestamp], e2[:timestamp])
      if comparison.nil?
        # Handle concurrency (could log or take some other action)
        puts "Concurrent events detected: #{e1} and #{e2}"
        0
      else
        comparison
      end
    end
  end
end