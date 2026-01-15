const arr = [
  'Breakfast', 
  'Roll pie', 
  'Bakeries', 
  'Appetizers', 
  'Salads',
  'Hawawshi Etoile', 
  'Pasta', 
  'Pizza', 
  'Italian Hawawshi', 
  'Egyptian Savory Fetter', 
  'Crepe', 
  'Wrap Sandwich & Man\'oucheh',
  'Egyptian Sweet Fetter', 
  'Additions', 
  'Desserts', 
  'Smoothie & Shake', 
  'Etoile Cocktail', 
  'Hot Drinks', 
  'Ice Drinks'
]

const categories = document.querySelector(".categories")

// Create category buttons with data attributes
arr.forEach((category) => {
  const categoryDiv = document.createElement('div')
  categoryDiv.innerHTML = `
    <button 
      data-category="${category}" 
      style="
        border-radius:25px; 
        background-color:blue; 
        padding:10px 20px; 
        color:white; 
        border:none; 
        cursor:pointer;
        white-space: nowrap;
        transition: all 0.3s ease;
      "
    >
      ${category}
    </button>
  `
  categories.append(categoryDiv)
})

const options = {
  root: null,
  threshold: 0.3 // Trigger when 30% of the section is visible
}

// Create category section mapping with URL-friendly class names
const categoryElements = []
const categoryButtons = document.querySelectorAll('.categories button')

// Function to create URL-friendly class name
const getSafeClassName = (name) => {
  return name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/&/g, 'and')
    .replace(/'/g, '')
}

// Find and observe all category sections that exist in the DOM
arr.forEach((categoryName) => {
  const className = getSafeClassName(categoryName)
  const categoryElement = document.querySelector(`.${className}`)
  
  if (categoryElement) {
    // Add custom attribute to track category name
    categoryElement.setAttribute('data-category-name', categoryName)
    categoryElements.push({
      element: categoryElement,
      name: categoryName,
      className: className
    })
  }
})

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const categoryName = entry.target.getAttribute('data-category-name')
      
      // Reset all buttons to blue
      categoryButtons.forEach(button => {
        button.style.backgroundColor = 'blue'
        button.style.transform = 'scale(1)'
      })
      
      // Find and highlight the corresponding button
      const targetButton = Array.from(categoryButtons).find(
        button => button.getAttribute('data-category') === categoryName
      )
      
      if (targetButton) {
        targetButton.style.backgroundColor = 'red'
        targetButton.style.transform = 'scale(1.05)'
        
        // Smooth scroll the categories container to make the button visible
        const buttonRect = targetButton.getBoundingClientRect()
        const categoriesRect = categories.getBoundingClientRect()
        
        if (buttonRect.left < categoriesRect.left || buttonRect.right > categoriesRect.right) {
          targetButton.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          })
        }
      }
    }
  })
}

const observer = new IntersectionObserver(callback, options)

// Observe all category elements
categoryElements.forEach(item => {
  observer.observe(item.element)
})

// Add click functionality to scroll to sections
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const categoryName = button.getAttribute('data-category')
    const className = getSafeClassName(categoryName)
    const targetSection = document.querySelector(`.${className}`)
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
})