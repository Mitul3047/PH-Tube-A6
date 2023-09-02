
        // blog handler
        const handleBlog = () => {
            const blogUrl = 'blog.html';
            window.open(blogUrl, '_blank');
        };

        // categories handler
        const handleCategory = async () => {
            const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
            const data = await response.json();
            const categoriesContainer = document.getElementById('categories-container');
            data.data?.forEach((category) => {
                const div = document.createElement("div");
                div.innerHTML = `
                    <button class="btn rounded active:bg-[#FF1F3D] active:text-white" onclick="handleCategoryButton('${category.category_id}')">${category.category}</button>
                `;
                categoriesContainer.appendChild(div);
            });
        };

        // handle category button
        const handleCategoryButton = async (categoryId) => {
            const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
            const data = await response.json();
            const cardContainer = document.getElementById('card-container');
            cardContainer.innerHTML = '';
            if (data.data && data.data.length > 0) {
                data.data.forEach((categoryType) => {
                    const div = document.createElement('div');
                    // ... (rest of the code)
                    cardContainer.appendChild(div);
                });
            } else {
                const div = document.createElement('div');
                div.innerHTML = `<p>Opps no data now</p>`;
                cardContainer.appendChild(div);
            }
            data.data?.forEach((categoryType) => {
                const div = document.createElement('div');
                const seconds = new Date(categoryType?.others?.posted_date);
console.log(seconds)
                const hours = seconds / 60;
                const minutes = seconds % 60;

                div.innerHTML = `
                    <div class="card h-[400px] bg-base-100 shadow-xl mb-10">
                        <figure><img src="${categoryType?.thumbnail}" alt="thumbnail" class="h-[200px] w-full" /></figure>
                        <p>${hours}:${minutes}</p>
                        <div class="card-body">
                            <div class="flex gap-3 items-center">
                                <img src="${categoryType?.authors[0].profile_picture}" alt="profile picture" class="w-10 h-10 rounded-full">
                                <h3>${categoryType?.title}</h3>
                            </div>
                            <div class="flex justify-between items-center">
                                <h3>${categoryType?.authors[0].profile_name}</h3>
                                <p>${categoryType?.authors[0].verified === false ? 'Verified' : '<img src="./images/verified.svg" alt="verified" class="pl-2">'}</p>
                            </div>
                            <h2>${categoryType?.others?.views}</h2>
                        </div>
                    </div>
                `;

                cardContainer.appendChild(div);
            });
        };

        handleCategoryButton('1000');
        handleCategory();
  
