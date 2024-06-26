import bcrypt from 'bcryptjs';

const data = {
    products: [

        {
            name: 'Pizza Pants',
            slug: 'pizza-pants',
            category: 'Pants',
            image: '/imgs/pizza.jpg',
            price: 45,
            brand: 'MyAi',
            rating: 4.5,
            numOfReviews: 4,
            countInStock: 6,
            desc: 'Best pants you ever wear',
            isFeatured: true,
            banner: '/imgs/pizza2.jpg',
        },
        {
            name: 'Glass Shirt',
            slug: 'glass-shirt',
            category: 'Shirts',
            image: '/imgs/glass.jpg',
            price: 33,
            brand: 'CooLyo',
            rating: 4,
            numOfReviews: 11,
            countInStock: 11,
            desc: 'Its crystal clear that its the best shirt',
            
        },
        {
            name: 'Marble Skirt',
            slug: 'marble-skirt',
            category: 'Dresses',
            image: '/imgs/marble.jpg',
            price: 50,
            brand: 'MyAi',
            rating: 4.5,
            numOfReviews: 8,
            countInStock: 20,
            desc: 'Stay cozy and stylish with this marble dress',
        },
        {
            name: 'Wooden Shirt',
            slug: 'wood-shirt',
            category: 'Shirts',
            image: '/imgs/wood.jpg',
            price: 99,
            brand: 'Veganli',
            rating: 4.2,
            numOfReviews: 15,
            countInStock: 30,
            isFeatured: true,
            banner: '/imgs/wood2.jpg',
            desc: 'Experience the nature on your body',
        }
        ,
        {
            name: 'GrassShirt',
            slug: 'grass-shirt',
            category: 'Shirts',
            image: '/imgs/grass.jpg',
            price: 75,
            brand: 'Veganli',
            rating: 4.8,
            numOfReviews: 25,
            countInStock: 0,
            desc: 'Be a part of the filed',
        }
        ,
        {
            name: 'Glass Dress',
            slug: 'glass-dress',
            category: 'Dresses',
            image: '/imgs/glass-dress.jpg',
            price: 55,
            brand: 'CooLyo',
            rating: 4.6,
            numOfReviews: 12,
            countInStock: 18,
            isFeatured: true,
            banner: '/imgs/glass-d2.jpg',
            desc: 'Wanna be a crystal princess?',
        }
        ,
        {
            name: 'Flower Dress',
            slug: 'flower-dress',
            category: 'Dresses',
            image: '/imgs/flower.jpg',
            price: 28,
            brand: 'Veganli',
            rating: 4.3,
            numOfReviews: 10,
            countInStock: 22,
            desc: 'Add a touch of nature charm to your look with that dress.',
        }
        ,
        {
            name: 'Metal Pants',
            slug: 'metal-pants',
            category: 'Pants',
            image: '/imgs/metal.jpg',
            price: 33,
            brand: 'MyAi',
            rating: 2,
            numOfReviews: 18,
            countInStock: 14,
            desc: 'Good luck with what you metal head',
        }
        ,
        


    ],
    users: [
        {
            name: 'Arik Alexandrov',
            email: 'arikxl@gmail.com',
            password: bcrypt.hashSync('123412341234'),
            isAdmin: true,
        },
        {
            name: 'Admin Adminovich',
            email: 'admin@gmail.com',
            password: bcrypt.hashSync('123412341234'),
            isAdmin: false,
        },
    ]
}




export default data