import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Area extends Model {
  public id!: number;
  public nome!: string;
  public customerId!: number;
  public latitude!: number;
  public longitude!: number;
}

Area.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: true },   // <-- adicionar
    longitude: { type: DataTypes.FLOAT, allowNull: true },  // <-- adicionar
  },
  { sequelize, tableName: "areas", timestamps: true }
);

export default Area;
