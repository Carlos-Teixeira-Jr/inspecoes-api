import { DataTypes, Model, Optional, HasManyGetAssociationsMixin } from "sequelize";
import sequelize from "../config/database";
import Equipment from "./equipment.model";
import Customer from "./customer.model";

interface AreaAttributes {
  id: number;
  nome: string;
  customerId: number;
  latitude?: number;
  longitude?: number;
}

interface AreaCreationAttributes extends Optional<AreaAttributes, "id"> {}

class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  public id!: number;
  public nome!: string;
  public customerId!: number;
  public latitude!: number;
  public longitude!: number;

  // ✅ Associação
  public customer?: Customer;
  public equipamentos?: Equipment[];

  public getEquipamentos!: HasManyGetAssociationsMixin<Equipment>;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Area.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: true },
    longitude: { type: DataTypes.FLOAT, allowNull: true },
  },
  { sequelize, tableName: "areas", timestamps: true }
);

export default Area;
