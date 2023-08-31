// blog handler

const handleBlog = () => {
    const blogUrl = 'blog.html';
    window.open(blogUrl, '_blank');
}


// catagory handler

const handelcatagory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await response.json();
    // console.log(data.data);
    const categoriesContainer = document.getElementById('categories-container');
    data.data?.forEach((category) => {
        // console.log(category)
        const div = document.createElement("div")
        div.innerHTML =`
        <button  class = "btn rounded active:bg-[[#FF1F3D] active:text-white ">${category.category}</button>
        `
        categoriesContainer.appendChild(div)
        //     `
        // <a class="tab" onclick ="handleTabNews('${category.category_id}')">${category.category_name}</a>  
        // `
        
        // handleTabNews('01')
    })

}

handelcatagory()