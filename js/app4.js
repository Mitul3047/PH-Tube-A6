// Function to handle opening the blog
const handleBlog = () => {
    const blogUrl = 'blog.html';
    window.open(blogUrl, '_blank');
}
const handleHome = () => {
    const homeUrl = 'index.html';
    window.open(homeUrl, '_blank');
}

// Function to handle fetching and displaying categories
const handleCategories = async () => {
    try {
        const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
        const data = await response.json();
        const categoriesContainer = document.getElementById('categories-container');

        // Loop through the categories data and create buttons for each category
        data.data?.forEach((category) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <button class="btn rounded active:bg-[#FF1F3D] active:text-white" onclick="handleCategoryButton('${category.category_id}')">${category.category}</button>
            `;
            categoriesContainer.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}

// Function to handle fetching and displaying category-specific content
const handleCategoryButton = async (categoryId) => {
    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data = await response.json();
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = '';

        // Check if there is no data for the selected category
        if (data.data.length === 0) {
            const div = document.createElement('div');
            cardContainer.classList.remove("grid");
            div.innerHTML = `
                <div class="flex justify-center items-center flex-col">
                    <div class="card card-compact  bg-base-100 ">
                        <figure><img src="./images/Icon.png" alt="Error" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">asdfghjkl</h2>
                        </div>
                    </div>
                </div>
            `;
            cardContainer.appendChild(div);
        } else {
            // Loop through the data and create card elements for each category type
            cardContainer.classList.add("grid");
            
            // Fetch and sort the views for the selected category
            const sortedViews = await fetchAndSortViewsByCategory(categoryId);

            // Loop through the data and create card elements for each category type
            data.data?.forEach((categoryType, index) => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class="card h-[400px] bg-base-100 shadow-xl mb-10">
                        <figure><img src="${categoryType?.thumbnail}" alt="thumbnail" class="h-[200px] w-full" /></figure>
                        <h4 class="bg-[#171717] -mt-10 m-4 p-1 flex justify-end text-white">${categoryType?.others?.posted_date}</h4>

                        <div class="card-body">
                            <div class="flex gap-3 items-center">
                                <img src="${categoryType?.authors[0].profile_picture}" alt="profile picture" class="w-10 h-10 rounded-full">
                                <h3>${categoryType?.title}</h3>
                            </div>
                            <div class="flex justify-between items-center">
                                <h3>${categoryType?.authors[0].profile_name}</h3>
                                <p>${categoryType?.authors[0].verified === "" || categoryType?.authors[0].verified === false ? '' : '<img src="./images/verified.svg" alt="" class="pl-2">'}</p>
                            </div>
                            <h2>${sortedViews[index]}</h2>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(div);
            });
        }
    } catch (error) {
        console.error("Error fetching category content:", error);
    }
}

// Function to fetch and sort views by category
async function fetchAndSortViewsByCategory(categoryId) {
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Collect the "views" values
        const viewsArray = data.data.map(categoryType => categoryType.others.views);

        // Sort the viewsArray in ascending order
        viewsArray.sort((a, b) => parseInt(a) - parseInt(b));

        return viewsArray;
    } catch (error) {
        console.error("Error fetching and sorting views:", error);
        return [];
    }
}

// Initialize the category buttons and content
handleCategories();
handleCategoryButton('1000');
