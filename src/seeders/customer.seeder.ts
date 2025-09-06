// src/seedDatabase.ts
import fs from "fs";
import path from "path";
import Activity from "../models/activity.model";
import Area from "../models/area.model";
import Customer from "../models/customer.model";
import Equipment from "../models/equipment.model";


// Lê o arquivo JSON
const seedFilePath = path.join(__dirname, "data", "fire_inspection_mock.json");
const seedData = JSON.parse(fs.readFileSync(seedFilePath, "utf-8"));
console.log(Array.isArray(seedData));

export async function seedDatabase() {
  for (const cust of seedData) {
    // Cria Customer se não existir
    const [customer] = await Customer.findOrCreate({
      where: { nome: cust.nome },
      defaults: {
        endereco: cust.endereco,
        latitude: cust.latitude,
        longitude: cust.longitude,
      },
    });

    for (const area of cust.areas) {
      // Cria Area se não existir
      const [areaDb] = await Area.findOrCreate({
        where: { nome: area.nome, customerId: customer.id },
        defaults: {
          latitude: area.latitude,
          longitude: area.longitude,
          customerId: customer.id,
        },
      });

      for (const equip of area.equipamentos) {
        // Cria Equipment se não existir
        const [equipDb] = await Equipment.findOrCreate({
          where: { nome: equip.nome, areaId: areaDb.id },
          defaults: {
            tipo: equip.tipo,
            areaId: areaDb.id,
          },
        });

        // Cria Activity se não existir
        if (equip.atividade) {
          await Activity.findOrCreate({
            where: {
              descricao: equip.atividade.descricao,
              equipmentId: equipDb.id,
            },
            defaults: {
              ...equip.atividade,
              equipmentId: equipDb.id,
            },
          });
        }
      }
    }
  }
}
