import { SQL, eq } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { db } from "../config";

export abstract class BaseRepository<
  TTable extends PgTable,
  TInsert extends TTable["$inferInsert"] = TTable["$inferInsert"],
  TSelect extends TTable["$inferSelect"] = TTable["$inferSelect"],
> {
  protected abstract table: any;

  async findAll(options?: {
    where?: SQL;
    orderBy?: SQL;
    limit?: number;
    offset?: number;
  }): Promise<TSelect[]> {
    const { where, orderBy, limit, offset } = options || {};
    let query = db.select().from(this.table).$dynamic();

    if (where) query = query.where(where);
    if (orderBy) query = query.orderBy(orderBy);
    if (limit) query = query.limit(limit);
    if (offset) query = query.offset(offset);

    return query as Promise<TSelect[]>;
  }

  async findById(id: string): Promise<TSelect | undefined> {
    const [record] = await db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1);

    return record as TSelect | undefined;
  }

  async create(data: TInsert): Promise<TSelect> {
    const [record] = await db.insert(this.table).values(data).returning();

    return record as TSelect;
  }

  async update(
    id: string,
    data: Partial<Omit<TInsert, "id" | "createdAt" | "updatedAt">>,
  ): Promise<TSelect | undefined> {
    const [record] = await db
      .update(this.table)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(this.table.id, id))
      .returning();

    return record as TSelect | undefined;
  }

  async delete(id: string): Promise<TSelect | undefined> {
    const [record] = await db
      .delete(this.table)
      .where(eq(this.table.id, id))
      .returning();

    return record as TSelect | undefined;
  }
}
