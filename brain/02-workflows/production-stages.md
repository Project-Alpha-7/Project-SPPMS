# Production Stages

Ordered sequence (`sequence_number`):

| # | Stage | Covers (folded in from v1) |
| --- | --- | --- |
| 1 | Pre-Press | Design check, plate making |
| 2 | Printing | |
| 3 | Quality Check | |
| 4 | Finishing | Lamination, cutting, folding, binding, rounded corners |
| 5 | Packing | |
| 6 | Ready for Delivery | |
| 7 | Dispatch | |
| 8 | Delivered | |

## Stage statuses

`Pending` · `In Progress` · `Completed` · `On Hold` · `Issue`

## Rules

- Store **who** changed the stage and **when** (`updated_by`, `started_at`, `completed_at`).
- Block invalid transitions where practical (e.g. you can't complete Printing before Pre-Press is done).
- On Hold and Issue need a note.
- Only authorised roles can update stages (admin, or staff for the stages assigned to them).
- Updates must survive a page refresh. Save first, then broadcast in real time.
- Customers see the milestones they're allowed to see. **Internal notes stay private.**
- Stage owner (`assigned_to`) is optional.
