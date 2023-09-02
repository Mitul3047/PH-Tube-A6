

// Function to handle opening the blog
const handleBlog = () => {
    const blogUrl = 'blog.html';
    window.open(blogUrl, '_blank');
}

// Function to handle fetching and displaying categories
const handelcatagory = async () => {
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
}

// Function to handle fetching and displaying category-specific content
const handleCategoryButton = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    // Check if there is no data for the selected category
    if (data.data.length === 0) {
        const div = document.createElement('div');
        cardContainer.classList.remove("grid")
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
       
        data.data?.forEach((categoryType) => {
            const { thumbnail, title, authors, others } = categoryType;
            let hours ;
            let mins;
            if (others.posted_date) {
                
                hours = Math.floor(others.posted_date / 3600) % 24
                mins = Math.floor((others.posted_date % 3600) / 60)
            }
            const div = document.createElement('div');
            cardContainer.classList.add("grid")
            // data.data?.forEach(item => {
               
            // });
            
            div.innerHTML = `
                <div class="card h-[400px] bg-base-100 shadow-xl mb-10">
                <div class =" relative">  
                <img src="${thumbnail}" alt="thumbnail" class="h-[200px] w-full" />
                <h2> ${others.posted_date ? `<h3 class=" bg-black px-2 py-1 text-white rounded-lg absolute bottom-2 right-2"> ${hours} Hrs ${mins} Min ago </h3>` : ""} </h2>
                    </div> 
                    <div class="card-body">
                        <div class="flex gap-3 items-center">
                            <img src="${authors[0].profile_picture}" alt="profile picture" class="w-10 h-10 rounded-full">
                            <h3>${title}</h3>
                        </div>
                        <div class="flex justify-between items-center">
                            <h3>${categoryType?.authors[0].profile_name}</h3>
                            <p>${categoryType?.authors[0].verified == "" || categoryType?.authors[0].verified === false ? '' : '<img src="./images/verified.svg" alt="" class="pl-2">'}</p>
                        </div>
                        <h2>${categoryType?.others?.views}</h2>
                    </div>
                </div>
            `;
            cardContainer.appendChild(div);
        });
    }
}





// Initialize the category buttons and content
handelcatagory();
handleCategoryButton('1000');


