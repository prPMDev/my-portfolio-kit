#!/usr/bin/env node
/**
 * Generate skills.json from skill.md files
 *
 * Reads frontmatter from each skill file and gets last modified date from git.
 * Run: node generate-skills.js
 *
 * Note: Uses execSync intentionally — this is a local maintainer tool,
 * not a web-facing application. No user input reaches the shell command.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SKILLS_DIR = path.join(__dirname, '.claude', 'skills');
const OUTPUT_FILE = path.join(__dirname, 'skills.json');

// Skill type classification
const SKILL_TYPES = {
    // Builder skills - create content
    'setup': 'builder',
    'content-strategist': 'builder',
    'story-adapter': 'builder',
    'portfolio-copywriter': 'builder',
    'anonymizer': 'builder',
    'website-expert': 'builder',
    'update': 'builder',
    // Evaluator skills - review content
    'voice-guardian': 'evaluator',
    'web-content-optimizer': 'evaluator',
    'quality-check': 'evaluator',
};

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};

    const frontmatter = {};
    const lines = match[1].split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
            frontmatter[key] = value;
        }
    }

    return frontmatter;
}

function getLastModified(filePath) {
    try {
        // Redirect stderr to suppress errors on repos with no commits
        const date = execSync(`git log -1 --format=%cI -- "${filePath}" 2>/dev/null`, {
            encoding: 'utf8',
            cwd: __dirname
        }).trim();
        return date || null;
    } catch (e) {
        return null;
    }
}

function generateSkills() {
    const skills = [];

    // Read all skill directories
    const skillDirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const skillName of skillDirs) {
        const skillFile = path.join(SKILLS_DIR, skillName, 'skill.md');

        if (!fs.existsSync(skillFile)) {
            console.warn(`Warning: No skill.md found in ${skillName}`);
            continue;
        }

        const content = fs.readFileSync(skillFile, 'utf8');
        const frontmatter = parseFrontmatter(content);

        const entry = {
            name: frontmatter.name || skillName,
            description: frontmatter.description || 'No description',
            type: SKILL_TYPES[skillName] || 'builder',
            version: frontmatter.version || '1.0.0'
        };

        const lastModified = getLastModified(skillFile);
        if (lastModified) {
            entry.lastUpdated = lastModified;
        }

        skills.push(entry);
    }

    return skills;
}

// Main
const skills = generateSkills();
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(skills, null, 2));
console.log(`Generated ${OUTPUT_FILE} with ${skills.length} skills`);
