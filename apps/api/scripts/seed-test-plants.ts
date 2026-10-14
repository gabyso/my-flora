import 'dotenv/config';

import { createPrismaClient } from '../src/infrastructure/database/prisma';

const testPlants = [
  {
    id: '6f23d793-7b96-4c16-8d95-1177f6d18c5c',
    nickname: 'TEST - Healthy Monstera',
    species: 'Monstera deliciosa',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___healthy/000146ff-92a4-4db6-90ad-8fce2ae4fddd___GH_HL%20Leaf%20259.1.JPG',
    healthStatus: 'healthy',
    nextAction: 'No urgent action needed. Check moisture in 2 days.',
  },
  {
    id: '5f4be6a5-7a1f-4f01-b937-7be5f82ddd39',
    nickname: 'TEST - Dry Leaves',
    species: 'Peace Lily',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Potato___Early_blight/001187a0-57ab-4329-baff-e7246a9edeb0___RS_Early.B%208178.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Soil is likely dry. Water thoroughly and reassess tomorrow.',
  },
  {
    id: '8f8f5f44-f52d-498c-93af-d1e0f0bc02e3',
    nickname: 'TEST - Yellowing',
    species: 'Pothos',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Leaf_Mold/00694db7-3327-45e0-b4da-a8bb7ab6a4b7___Crnl_L.Mold%206923.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Potential overwatering. Let top soil dry before next watering.',
  },
  {
    id: '4fcf33df-fda6-4114-868f-43bc66f26604',
    nickname: 'TEST - New Growth',
    species: 'Zamioculcas zamiifolia',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Pepper%2C_bell___healthy/00100ffa-095e-4881-aebf-61fe5af7226e___JR_HL%207886.JPG',
    healthStatus: 'healthy',
    nextAction: 'Looks strong. Rotate pot for even light exposure.',
  },
  {
    id: '2af4e9f8-3a84-4ef2-9ab6-00b56cbe1261',
    nickname: 'TEST - Unknown Condition',
    species: 'Ficus elastica',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Tomato_Yellow_Leaf_Curl_Virus/00139ae8-d881-4edb-925f-46584b0bd68c___YLCV_NREC%202944.JPG',
    healthStatus: 'unknown',
    nextAction: 'Capture another photo in natural light for better diagnosis.',
  },
  {
    id: 'f6d9d4cb-f5b7-4ca8-a4c2-652ea5f4d9f1',
    nickname: 'TEST - Tomato Early Blight',
    species: 'Tomato',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Early_blight/0012b9d2-2130-4a06-a834-b1f3af34f57e___RS_Erly.B%208389.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Remove heavily affected leaves and improve airflow around the plant.',
  },
  {
    id: '2b0a0d40-9013-44a2-bac4-0f7f2ed880b3',
    nickname: 'TEST - Tomato Late Blight',
    species: 'Tomato',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Late_blight/0003faa8-4b27-4c65-bf42-6d9e352ca1a5___RS_Late.B%204946.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Isolate this plant and avoid wetting foliage while watering.',
  },
  {
    id: '7a9c017f-16ad-4a66-af0c-30f860f9222e',
    nickname: 'TEST - Septoria Spots',
    species: 'Tomato',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Septoria_leaf_spot/002533c1-722b-44e5-9d2e-91f7747b2543___Keller.St_CG%201831.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Trim spotted leaves and keep humidity lower for a few days.',
  },
  {
    id: '976667e8-51ce-4665-8716-915fd57f7fca',
    nickname: 'TEST - Spider Mite Damage',
    species: 'Tomato',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Spider_mites%20Two-spotted_spider_mite/002835d1-c18e-4471-aa6e-8d8c29585e9b___Com.G_SpM_FL%208584.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Check leaf undersides and rinse gently to reduce mite pressure.',
  },
  {
    id: 'ecafc9fd-6f2a-4730-ac2a-4aa2b0f5a1c6',
    nickname: 'TEST - Target Spot',
    species: 'Tomato',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Target_Spot/002213fb-b620-4593-b9ac-6a6cc119b100___Com.G_TgS_FL%208360.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Remove debris around the pot and monitor for new spots daily.',
  },
  {
    id: '7c98fef0-d79d-4401-b7a0-b48375e82c5c',
    nickname: 'TEST - Bacterial Spot',
    species: 'Tomato',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Tomato___Bacterial_spot/00416648-be6e-4bd4-bc8d-82f43f8a7240___GCREC_Bact.Sp%203110.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Avoid splashing water on leaves and sanitize pruning tools.',
  },
  {
    id: '9b1f245b-4e35-4ed6-8b35-e4e77f6fd6d0',
    nickname: 'TEST - Potato Late Blight',
    species: 'Potato',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Potato___Late_blight/0051e5e8-d1c4-4a84-bf3a-a426cdad6285___RS_LB%204640.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Quarantine this plant and inspect nearby plants for spread.',
  },
  {
    id: '9b4cdc42-a0db-4fce-89f2-e91790ba3167',
    nickname: 'TEST - Pepper Bacterial Spot',
    species: 'Bell Pepper',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Pepper%2C_bell___Bacterial_spot/0022d6b7-d47c-4ee2-ae9a-392a53f48647___JR_B.Spot%208964.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Increase airflow and keep leaves dry to reduce progression.',
  },
  {
    id: '98bf6c14-ef46-4a73-8de3-31f50020ef20',
    nickname: 'TEST - Cercospora Leaf Spot',
    species: 'Corn',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Corn_(maize)___Cercospora_leaf_spot%20Gray_leaf_spot/00120a18-ff90-46e4-92fb-2b7a10345bd3___RS_GLSp%209357.JPG',
    healthStatus: 'needs_attention',
    nextAction: 'Track spread by taking another photo after 48 hours.',
  },
  {
    id: '03df8dde-af9f-491a-a41b-7888f8d4e8b0',
    nickname: 'TEST - Grape Leaf Blight',
    species: 'Grape',
    imageUrl:
      'https://raw.githubusercontent.com/spMohanty/PlantVillage-Dataset/master/raw/color/Grape___Leaf_blight_(Isariopsis_Leaf_Spot)/0001aa74-bbd7-433b-a900-1dccab39d521___FAM_L.Blight%204508.JPG',
    healthStatus: 'unknown',
    nextAction: 'Condition is unclear. Capture a brighter close-up for confidence.',
  },
] as const;

async function main(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set. Cannot seed test plants.');
  }

  const prisma = createPrismaClient(databaseUrl);
  const timestamp = new Date();

  try {
    await prisma.$connect();
    await prisma.plant.deleteMany({
      where: {
        nickname: {
          startsWith: 'TEST - ',
        },
      },
    });

    await prisma.plant.createMany({
      data: testPlants.map((plant) => ({
        ...plant,
        createdAt: timestamp,
        updatedAt: timestamp,
      })),
    });

    console.log(`Seeded ${testPlants.length} test plants.`);
  } finally {
    await prisma.$disconnect();
  }
}

void main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
