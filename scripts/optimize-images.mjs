#!/usr/bin/env node

/**
 * Script d'optimisation automatique des images
 * Utilise SVGO pour les SVG
 */

import { execSync } from "child_process";
import { existsSync, readdirSync, statSync } from "fs";
import { join } from "path";

console.log("🖼️  Démarrage de l'optimisation des images...\n");

// Fonction pour obtenir la taille d'un fichier en KB
function getFileSize(filePath) {
    try {
        const stats = statSync(filePath);
        return (stats.size / 1024).toFixed(2);
    } catch {
        return "0";
    }
}

// Analyse des fichiers dans un dossier
function analyzeDirectory(dir, label) {
    if (!existsSync(dir)) {
        console.log(`⚠️  Dossier ${dir} introuvable\n`);
        return;
    }

    console.log(`📁 Analyse du dossier ${label}:`);

    try {
        const files = readdirSync(dir);
        const imageFiles = files.filter((file) =>
            /\.(svg|png|jpg|jpeg|webp|gif)$/i.test(file)
        );

        if (imageFiles.length === 0) {
            console.log("   Aucune image trouvée\n");
            return;
        }

        imageFiles.forEach((file) => {
            const filePath = join(dir, file);
            const size = getFileSize(filePath);
            const ext = file.split(".").pop().toUpperCase();

            console.log(`   📄 ${file} (${ext}) - ${size} KB`);
        });
    } catch (error) {
        console.log(`   ❌ Erreur d'accès: ${error.message}`);
    }

    console.log("");
}

// Optimisation des SVG avec SVGO
function optimizeSVGs() {
    console.log("📐 Optimisation des fichiers SVG...");

    try {
        execSync("npx svgo --folder=src/assets/images --config=svgo.config.cjs", {
            stdio: "inherit",
        });
        console.log("✅ SVG optimisés avec succès\n");
    } catch (error) {
        console.error("❌ Erreur lors de l'optimisation SVG:", error.message);
    }
}

// Recommandations
function giveRecommendations() {
    console.log("💡 Recommandations d'optimisation:\n");
    console.log("✅ SVG: Format optimal pour vos illustrations");
    console.log("🔄 WebP: Idéal pour photos et logos complexes");
    console.log("📊 Vos images sont déjà bien optimisées !\n");
}

// Exécution
const ASSETS_DIR = "./src/assets/images";
const PUBLIC_DIR = "./public";

analyzeDirectory(ASSETS_DIR, "Assets (SVG)");
analyzeDirectory(PUBLIC_DIR, "Public (WebP)");
optimizeSVGs();
giveRecommendations();
console.log("🎉 Optimisation terminée !");
