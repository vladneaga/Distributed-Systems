require "./participant.rb"

# Create participants
server1 = Participant.new("server1")
server2 = Participant.new("server2")

# Put operations on server1
update1 = server1.put("key1", "value1")
server2.receive_update(update1)

# Concurrent put operations
update2 = server1.put("key2", "value2")
update3 = server2.put("key1", "new_value1")

# Servers receive updates
server1.receive_update(update3)
server2.receive_update(update2)

# Get operations to verify the values
server1.get("key1")
server2.get("key1")
server1.get("key2")
server2.get("key2")

# Collect all updates in a random order
puts "\nUpdates in random order:"
updates = [update1, update2, update3].shuffle
updates.each { |update| puts update }

# Order updates by their timestamp
puts "\nUpdates in timestamp order:"
updates = VectorClock.sort(updates)
updates.each { |update| puts update }