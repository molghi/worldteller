// Function to assign random colour for each country
const getRandomColour = () => {
    // COLORFUL:
    // const letters = "0123456789ABCDEF";
    // let color = "#";
    // for (let i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    // return color;

    // SHADES OF STEEL:
    // const base = Math.floor(Math.random() * 56) + 100; // Range: 100–155 for softer steel shades
    const base = Math.floor(Math.random() * 100) + 100; // Base value between 100–200 for a steely tone
    return `rgb(${base}, ${base + 10}, ${base + 20})`; // Slight variation in RGB for a steely look
};

export default getRandomColour;
