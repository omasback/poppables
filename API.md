# Poppables API Doc

### POST /api/games/fetch_token

Generates a new token

```json
{
  "game_name": "dots",
}
```

#### Response (201)

```json
{
  "token": "c57b1e5fe679b97904eb4cdf4439cf18"
}
```

### POST /api/games/record_score

Creates a game score

```json
{
  "game_name": "pops",
  "initials": "ABC",
  "transformed_token": "M2U2MmI+ZGNjZzdgZzc3ZzBlPzc+NjNgZzI+ZGU3YzQ3NzY2\n",
}
```

#### Response (201)

```json
{
  "success": true
}
```

### POST /api/games/redeem

Game Scores API #redeem with a valid token creates a game redemption

```json
{
  "email": "phyllis@leannon.co.uk",
  "game_name": "pops",
  "transformed_token": "M2BgNj4/NzIwNmdiYjUxPjRkMWU2ZzI0MT8yMDUzZzA3NzY2\n",
}
```

#### Response (201)

```json
{
  "success": true,
  "result": "win_free_bag",
  "redemption_url": "http://bricks.coupons.com/enable.asp?o=12345&c=123455&p=0a32842838dc367f924a859ecdc355c7&cpt=namxueuucvij"
}
```

### POST /api/games/redeem\_and\_register

Game Scores API #redeem\_and\_register with a valid token creates a game redemption

```json
{
  "email": "test@test.com",
  "first_name": "Tom",
  "last_name": "Thumb",
  "dob": "2000-01-01",
  "zip_code": "90277",
  "game_name": "pops",
  "transformed_token": "PjE2Pj81P2RjMzc2PjNlNTAwMjA+NzVkNDZnZGJnYjE3NzY2\n",
}
```

#### Response (201)

```json
{
  "success": true,
  "result": "win_free_bag",
  "redemption_url": "http://bricks.coupons.com/enable.asp?o=12345&c=123455&p=dcedb84c8e63ec2ecd1710bed530ca90&cpt=upxezttswfzijjadiwrd"
}
```
