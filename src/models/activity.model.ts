import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Activity extends Model {
  public id!: number;
  public descricao!: string;
  public equipmentId!: number;
  public data!: Date;
  public data_inicio!: Date;
  public data_finalizacao!: Date;
  public status!: string;
  public data_proxima_inspecao!: Date;
  public alerta!: string;
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
