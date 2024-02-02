import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface ProductCreationAttributes {
  article?: string;
  description: string;
  images: string[];
  inStock: number;
  labels: string[];
  price: number;
  reasonHiding?: string;
  title: string;
}

// @Column({ defaultValue: 0, type: DataType.NUMBER })
// estimation: number;
// @Column({ defaultValue: 0, type: DataType.NUMBER })
// reviews: number;
// @Column({ defaultValue: 0, type: DataType.NUMBER })
// soldTimes: number;

@Table
export default class Product extends Model<Product, ProductCreationAttributes> {
  @Column({ type: DataType.STRING })
  article?: string;

  @Column({ allowNull: false, type: DataType.STRING })
  description: string;

  @Column({ defaultValue: 0, type: DataType.INTEGER })
  estimation: number;

  @Column({ type: DataType.BOOLEAN })
  favorites: boolean;

  @Column({ autoIncrement: true, primaryKey: true, type: DataType.INTEGER, unique: true })
  id: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  images: string[];

  @Column({ allowNull: false, type: DataType.INTEGER })
  inStock: number;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  labels: string[];

  @Column({ allowNull: false, type: DataType.INTEGER })
  price: number;

  @Column({ type: DataType.STRING })
  reasonHiding: string;

  @Column({ defaultValue: 0, type: DataType.INTEGER })
  reviews: number;

  @Column({ defaultValue: 0, type: DataType.INTEGER })
  soldTimes: number;

  @Column({ allowNull: false, type: DataType.STRING })
  title: string;
}
