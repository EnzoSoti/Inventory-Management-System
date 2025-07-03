# Database Structure: Firestore (Inventory Management System)

## Collections & Fields

### users
- `uid` (string, doc ID)
- `email` (string)
- `role` (string: 'admin', 'staff', etc.)

### inventory
- `id` (string, doc ID)
- `name` (string)
- `category` (string)
- `quantity` (number)
- `price` (number)
- `supplier` (string)
- `description` (string)
- `lastUpdated` (timestamp/string)

### categories
- `id` (string, doc ID)
- `name` (string)

### suppliers
- `id` (string, doc ID)
- `name` (string)

### inventory_audit
- `id` (string, doc ID)
- `itemId` (string)
- `action` (string: 'add', 'edit', 'delete')
- `timestamp` (string)
- `userId` (string)
- `data` (object)

### transactions (planned/placeholder)
- `id` (string, doc ID)
- `itemId` (string)
- `type` (string: 'in', 'out')
- `quantity` (number)
- `timestamp` (string)
- `userId` (string)

## Relationships
- `inventory.category` references `categories.name`
- `inventory.supplier` references `suppliers.name`
- `inventory_audit.itemId` references `inventory.id`
- `transactions.itemId` references `inventory.id`

---
*Update this file whenever the database schema changes.* 