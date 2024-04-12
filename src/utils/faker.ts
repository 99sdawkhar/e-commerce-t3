// Import Prisma
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Function to generate fake categories
export const generateFakeCategories = async () => {
  try {
    const categories = Array.from({ length: 100 }, () => ({
      name: faker.commerce.department(),
    }));

    await prisma.category.createMany({
      data: categories,
    });

    return { success: true, message: 'Fake categories generated successfully.' };
  } catch (error) {
    console.error('Error generating fake categories:', error);
    return { success: false, error: `Error generating fake categories: ${error}` };
  } finally {
    await prisma.$disconnect();
  }
};