import { DataTypes, Model, HasManyGetAssociationsMixin } from "sequelize";
import sequelize from "../config/database";
import Area from "./area.model";

class Customer extends Model {
  public id!: number;
  public nome!: string;
  public endereco!: string;
  public latitude!: number;
  public longitude!: number;

  // ✅ Associação
  public areas?: Area[];

  public getAreas!: HasManyGetAssociationsMixin<Area>;
}

Customer.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    endereco: { type: DataTypes.STRING, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, tableName: "customers", timestamps: true }
);

export default Customer;
