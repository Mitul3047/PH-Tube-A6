// blog handler

const handleBlog = () => {
    const blogUrl = 'blog.html';
    window.open(blogUrl, '_blank');
}


// catagories handler

const handelcatagory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    // console.log(data.data);
    const categoriesContainer = document.getElementById('categories-container');
    data.data?.forEach((category) => {
        // console.log(category)
        const div = document.createElement("div")
        div.innerHTML = `
        <button  class = "btn rounded active:bg-[#FF1F3D] active:text-white" onclick ="handleCategoryButton('${category.category_id}')">${category.category}</button>
        `
        categoriesContainer.appendChild(div)
        //     `
        // <a class="tab" onclick ="handleTabNews('${category.category_id}')">${category.category_name}</a>  
        // `

        
    })

}

// handle category button 

const handleCategoryButton = async (categoryId) => {
    // console.log(categoryId)
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await response.json();
    console.log(data.data)
    // const tabNewsList = data.data
    // console.log(tabNewsList)

    const cardContainer = document.getElementById('card-container')
      cardContainer.innerHTML='';
      if (data.data.length === 0) {
        const div = document.createElement('div');
        div.className = 'flex justify-center items-center h-32';
        div.innerHTML = `
        
        <p class="text-center text-gray-500">Oops, no data available.</p>`;
        cardContainer.appendChild(div);
    } else {
    data.data?.forEach((categoryType) => {
        // console.log(categoryType)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card h-[400px] bg-base-100 shadow-xl mb-10">
                <figure><img src="${categoryType?.thumbnail}" alt="thumblin" class="h-[200px] w-full" /></figure>
                <p>${categoryType?.others?.posted_date}</p>
                <div class="card-body">
                  <div class=" flex gap-3 items-center">
                    <img src="${categoryType?.authors[0].profile_picture}" alt="profile picture" class="w-10 h-10 rounded-full">
                    <h3>${categoryType?.title}</h3>
                  </div>
                  <div class="flex justify-between items-center">
                    <h3>${categoryType?.authors[0].profile_name}</h3>
                    <p> ${categoryType?.authors[0].verified === false ? 'Verified' : 
                    '<img src="./images/verified.svg" alt="verified" class = "pl-2">'}</p>
                  </div>
                  <h2>${categoryType?.others?.views}</h2>
                </div>
              </div>
        `
    
        cardContainer.appendChild(div)
    })

}
}



handleCategoryButton('1000')
handelcatagory()