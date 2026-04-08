'use server'

import { db } from "@/db"
import { hairProducts, hairImages, hairColors, hairInches, categories } from "@/db/schema"
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache"

/* =========================
   1. CATEGORY ACTIONS
========================= */
export async function getCategories() {
  try {
    return await db.select().from(categories).orderBy(categories.name);
    // console.log("Fetched Categories:", categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
/* --- CREATE PRODUCT --- */
export async function createHairProduct(data: any) {
  try {
    return await db.transaction(async (tx) => {
      const [product] = await tx.insert(hairProducts).values({
        name: data.name,
        categoryId: data.categoryId,
        texture: data.texture,
        hairType: data.hairType,
        origin: data.origin,
        processing: data.processing,
        price: data.price,
        isOnSale: data.isOnSale || false,
        availability: 'in_hand',
        quantityInHand: data.quantityInHand || 0,
      }).returning();

      if (data.images?.length > 0) {
        await tx.insert(hairImages).values(data.images.map((url: string) => ({ productId: product.id, imageUrl: url })));
      }

      if (data.colors?.length > 0) {
        await tx.insert(hairColors).values(
          data.colors.map((c: any) => ({ 
            productId: product.id, 
            color: c.name, 
            additionalPrice: c.extra,
            isRestocked: c.restocked 
          }))
        );
      }

      // NEW: Added isInstock to the insertion
      if (data.inches?.length > 0) {
        await tx.insert(hairInches).values(
          data.inches.map((i: any) => ({ 
            productId: product.id, 
            inches: parseInt(i.value), 
            additionalPrice: i.extra,
            isInstock: i.isInstock 
          }))
        );
      }
      revalidatePath('/admin/products');
      return { success: true };
    });
  } catch (error) {
    return { success: false };
  }
}
export async function updateHairProduct(id: number, data: any) {
  try {
    return await db.transaction(async (tx) => {
      await tx.update(hairProducts).set({
        name: data.name,
        categoryId: data.categoryId,
        texture: data.texture,
        hairType: data.hairType,
        origin: data.origin,
        processing: data.processing,
        price: data.price,
        isOnSale: data.isOnSale,
        quantityInHand: data.quantityInHand || 0,
      }).where(eq(hairProducts.id, id));

      // Refresh Colors
      await tx.delete(hairColors).where(eq(hairColors.productId, id));
      if (data.colors?.length > 0) {
        await tx.insert(hairColors).values(
          data.colors.map((c: any) => ({ 
            productId: id, 
            color: c.name, 
            additionalPrice: c.extra,
            isRestocked: c.restocked 
          }))
        );
      }

      // Refresh Inches (NEW: Added isInstock)
      await tx.delete(hairInches).where(eq(hairInches.productId, id));
      if (data.inches?.length > 0) {
        await tx.insert(hairInches).values(
          data.inches.map((i: any) => ({ 
            productId: id, 
            inches: parseInt(i.value), 
            additionalPrice: i.extra,
            isInstock: i.isInstock
          }))
        );
      }

      // Handle Images
      if (data.images && data.images.length > 0) {
        await tx.delete(hairImages).where(eq(hairImages.productId, id));
        await tx.insert(hairImages).values(
          data.images.map((url: string) => ({ productId: id, imageUrl: url }))
        );
      }

      revalidatePath('/admin/products');
      return { success: true };
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return { success: false };
  }
}
/* =========================
   4. FETCHING ACTIONS
========================= */

// Get single product with category and relations
export async function getProductById(id: number) {
  try {
   
    const product = await db.query.hairProducts.findFirst({
      where: eq(hairProducts.id, id),
      with: {
        category: true, // Included Category
        images: true,
        colors: true,
        inches: true,
      },
    });
    console.log("Fetched Product:", product);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Get all products for admin table
export async function getAdminProducts() {
  try {
     
    const products = await db.query.hairProducts.findMany({
      with: {
        category: true, // Included Category
        images: true,
        colors: true,
        inches: true,
      },
      orderBy: [desc(hairProducts.id)],
    });
    console.log("Fetched Admin Products:", products[0].inches);
    console.log("Fetched Admin Products:", products[0].colors);
    return products;
  } catch (error) {
    console.error("Error fetching admin products:", error);
    return [];
  }
}

/* =========================
   5. DASHBOARD & DELETE
========================= */

export async function getDashboardStats() {
  try {
    const [stats] = await db.select({
      totalProducts: sql<number>`count(*)`,
      inHandCount: sql<number>`count(*) filter (where ${hairProducts.availability} = 'in_hand')`,
      totalValue: sql<number>`sum(${hairProducts.price})`,
    }).from(hairProducts);

    return {
      totalProducts: Number(stats.totalProducts || 0),
      inHandCount: Number(stats.inHandCount || 0),
      inventoryValue: Number(stats.totalValue || 0) / 100 
    };
  } catch (error) {
    console.error("Stats Error:", error);
    return { totalProducts: 0, inHandCount: 0, inventoryValue: 0 };
  }
}

export async function deleteProduct(id: number) {
  try {
    await db.delete(hairProducts).where(eq(hairProducts.id, id));
    revalidatePath('/admin/products');
    revalidatePath('/products');       // Update public list page
    revalidatePath('/');               // Update home page (if products show there)
    
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false };
  }
}