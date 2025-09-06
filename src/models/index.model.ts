import Customer from "./customer.model";
import Area from "./area.model";
import Equipment from "./equipment.model";
import Activity from "./activity.model";

Customer.hasMany(Area, { foreignKey: "customerId", as: "areas" });
Area.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });

Area.hasMany(Equipment, { foreignKey: "areaId", as: "equipamentos" });
Equipment.belongsTo(Area, { foreignKey: "areaId", as: "area" });

Equipment.hasOne(Activity, { foreignKey: "equipmentId", as: "atividade" });
Activity.belongsTo(Equipment, { foreignKey: "equipmentId", as: "equipment" });

export { Customer, Area, Equipment, Activity };
