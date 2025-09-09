import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Equipment from "./equipment.model";

interface ActivityAttributes {
  id: number;
  descricao: string;
  equipmentId: number;
  data?: Date;
  data_inicio?: Date | string;
  data_finalizacao?: Date | string;
  status: string;
  data_proxima_inspecao?: Date | string;
  alerta?: string;
}

interface ActivityCreationAttributes extends Optional<ActivityAttributes, "id"> {}

class Activity extends Model<ActivityAttributes, ActivityCreationAttributes> implements ActivityAttributes {
  public id!: number;
  public descricao!: string;
  public equipmentId!: number;
  public data!: Date;
  public data_inicio!: Date;
  public data_finalizacao!: Date;
  public status!: string;
  public data_proxima_inspecao!: Date;
  public alerta!: string;

  // ✅ Associação
  public equipment?: Equipment;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Activity.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    descricao: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.DATE, allowNull: true },
    data_inicio: { type: DataTypes.DATE, allowNull: true },
    data_finalizacao: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: false },
    data_proxima_inspecao: { type: DataTypes.DATE, allowNull: true },
    alerta: { type: DataTypes.STRING, allowNull: true },
    equipmentId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "activities", timestamps: true }
);

export default Activity;
