import { useEffect, useState } from "react";
import { BackButton, Banner, CategoryButton, CategoryMenu, Container, ProductsContainer } from "./styles";
import { api } from "../../services/api";
import { formatPrice } from "../../utils/formatedPrice";
import { CardProduct } from "../../components/CardProduct";
import {  useLocation, useNavigate } from "react-router-dom";





export function Menu() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    

    const navigate = useNavigate();
    const {search} = useLocation();

    const queryParams = new URLSearchParams(search);

   

    const [activeCategory, setActiveCategory] = useState(()=>{
         const categoryId = +queryParams.get('categoria');

         if(categoryId){
            return categoryId
         } 
         return 0;
    });  


    useEffect(() => {
        async function loadCategories() {
            const { data } = await api.get('/categories')           

            const newCategories = [{ id: 0, name: 'Todas' }, ...data]      

            setCategories(newCategories)

            

        }

        async function loadProducts() {
            const { data } = await api.get('/products')   

           
            
          

                const newProdcuts = data.map((product) => ({
                currencyValue: formatPrice(product.price),
                ...product,
            }))

            setProducts(newProdcuts)
        }
        loadCategories()
        loadProducts()
    }, [])

 useEffect (()=>{
        console.log('activeCategory:', activeCategory, typeof activeCategory);
  console.log('products[0]:', products[0]);

        if(activeCategory === 0 ) {
            setFilteredProducts(products)
        } else {
            const newFilteredProducts = products.filter(
                (product) => Number(product.category_id) === Number(activeCategory),
            );
                console.log('Filtrados:', newFilteredProducts);
            setFilteredProducts(newFilteredProducts);   
        }
       

    },[products, activeCategory])



    return (
        <Container>
            <Banner>
                <h1>O MELHOR
                    <br />
                    HAMBURGER
                    <br />
                    ESTÁ AQUI
                    <span>Esse cardápio está irresistível</span>
                </h1>
            </Banner>
            <BackButton
            
                onClick={()=>[
                    navigate({
                        pathname: '/',
                })
                ]}
            >Voltar</BackButton>
            <CategoryMenu>
                {categories.map((category) => (
                    <CategoryButton
                        key={category.id}
                        $isActiveCategory={category.id === activeCategory}                        
                        onClick={() => {
                                 navigate(
                                {
                                    pathname: '/cardapio',
                                    search: `?categoria=${category.id}`
                                },
                                {
                                    replace: true,
                                },
                            );
                            setActiveCategory(category.id)
                        }}
                    >{category.name}</CategoryButton>
                ))}

            </CategoryMenu>

            <ProductsContainer>
                {filteredProducts.map((product) => (
                    <CardProduct product={product} key={product.id} />
                ))}
            </ProductsContainer>

        </Container>

    );
}