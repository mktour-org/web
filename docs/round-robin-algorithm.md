

Our algorithm is getting the current round, projects a whole optimal round robin round set, and returns a random one from the set.

1. Get a list of previous finished games in a current tournament, if any.
2. If there are games, construct a relational table $N \times N$ size, which shows which player played with which one by stating ones.


FOR EVEN NUMBER OF PLAYERS

3. We then, by using greedy algorithm, assign pairs like so:
4. We define whole set of players. First player gets his pool of non-played opponents (matrix lookup), and is assigned one. This pair gets removed from the active pool of players. 
5. We continue selecting and assigning, until there will be no players in our pool. 
6. We return the bracket. 

FOR ODD NUMBER OF PLAYERS

3. We also form set of players who played more games than others. 
4. Everything is the same, but we also randomly select from that set a player, and remove it from the ACTIVE pool. 
5. Continue as is.


