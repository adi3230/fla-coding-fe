<script setup>
import {computed, onMounted, ref} from "vue";
import ProductsService from "./services/products.service.js";
import WordleBoard from "./components/WordleBoard.vue";

const products = ref([]);
const uniqueBrands = ref([]);
const uniqueTypes = ref([]);
const selectedBrand = ref('')
const selectedType = ref('')


onMounted(async () => {
  try {
    // Fetch products
    products.value = await ProductsService.fetchProducts();

    // Extract unique brands and types
    extractUniqueValues(products.value, uniqueBrands);
    extractUniqueValues(products.value, uniqueTypes, 'type');
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});

// Function to extract unique values from products array
const extractUniqueValues = (products, targetRef, key = 'brand') => {
  const uniqueValues = new Set();
  products.forEach(product => uniqueValues.add(product[key]));
  targetRef.value = Array.from(uniqueValues);
}

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (selectedBrand.value && selectedBrand.value !== 'Please select one') {
    filtered = filtered.filter(p => p.brand === selectedBrand.value)
  }

  if (selectedType.value && selectedType.value !== 'Please select one') {
    filtered = filtered.filter(p => p.type === selectedType.value)
  }

  return filtered;
});

const formatProductName = (name) => {
  return name.replace(/(Eau de Parfum|Eau de Toilette|Parfum)/g, '').trim()
}

const getWebpSrcset = (image) => {
  return `${image}?f=webp`;
};

const getJpegSrcset = (image) => {
  return `${image}?f=jpeg`;
};


</script>

<template>
  <div class="page-wrap">
    <div class="flaconi-nav">
      <div class="flaconi-nav__item">Gratisversand ab 29 €</div>
      <div class="flaconi-nav__item">Bis zu 2 Gratisproben</div>
      <div class="flaconi-nav__item">Zertifizierter Händler</div>
      <div class="flaconi-nav__item">120 Tage Rückgaberecht</div>
      <div class="flaconi-nav__item">Geschenkgutschein</div>
    </div>
    <div>
      <wordle-board :wordOfTheDay="TESTS"></wordle-board>
    </div>
    <div class="flaconi-header">
      <h1 class="flaconi-header__heading">
        Parfum
      </h1>
    </div>
    <main>
      <div class="flaconi-grid">
        <div class="flaconi-perfume-options">
          Here goes options
        </div>
        <div class="flaconi-list">
          <div class="flaconi-product__filter-options">
            <div class="flaconi-product__filter-brand">
              <select v-model="selectedBrand" class="custom-select">
                <option>Please select one</option>
                <option v-for="(brand, key) in uniqueBrands" :key="key">{{brand}}</option>
              </select>
            </div>
            <div class="flaconi-product__filter-brand">
              <select v-model="selectedType">
                <option>Please select one</option>
                <option v-for="(type, key) in uniqueTypes" :key="key">{{type}}</option>
              </select>
            </div>
          </div>
          <div class="flaconi-perfume-products">
            <transition-group name="product-list" tag="div" class="flaconi-perfume-products">
              <div class="flaconi-products__item" v-for="product in filteredProducts" :key="product.id">
                <div class="flaconi-products__image-wrapper">
                  <picture>
                    <source type="image/webp" :srcset="getWebpSrcset(product.image)">
                    <source type="image/jpeg" :srcset="getJpegSrcset(product.image)">
                    <img :src="product.image" :alt="product.name" class="flaconi-products__image" />
                  </picture>
                </div>
                <div class="flaconi-products__info">
                  <h3 class="flaconi-products__brand">{{product.brand}}</h3>
                  <h4 class="flaconi-products__name">{{formatProductName(product.name)}}</h4>
                  <div class="flaconi-products__type">{{product.type}}</div>
                  <div class="flaconi-products__price">ab {{product.price /100}}</div>
                  <div class="flaconi-products__price-per-unit">{{product.size}}</div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
  .flaconi-nav {
    font-family: $font-family;
    display: flex;
    justify-content: space-around;
    background-color: rgb(245, 243, 239);
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.009rem;
  }

  .flaconi-nav__item {
    padding: 0.5rem 0;
  }

  .flaconi-header {
    display: block;
    border-top: 0.0625rem solid rgb(193, 191, 196);
    border-bottom: 0.0625rem solid rgb(193, 191, 196);
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
    font-weight: 400;
  }

  .flaconi-header__heading {
    font-family: $font-family;
    font-size: 2.5rem;
    line-height: 3.5rem;
    font-weight: 700;
    letter-spacing: 0.03rem;
    margin: 0;
  }

  .flaconi-grid {
    display: grid;
    grid-template-columns: 23% 77%;
  }

  .flaconi-perfume-options {
    display: none;

    @include media-breakpoint-up(md) {
      display: block;
    }
  }

  .flaconi-perfume-products {
    display: grid;
    grid-template-areas: "image"
                         "info";
    grid-template-columns: repeat(2, 1fr);
    @include media-breakpoint-up(md) {
      grid-template-columns: repeat(3, auto);
    }
  }


  .flaconi-products__image-wrapper{
    grid-area: image;
    display: flex;
    justify-content: center;
  }

  .flaconi-products__image {
    height: auto;
    width: 154px;
    max-width: fit-content;
  }

  .flaconi-products__info {
    grid-area: info;
    min-height: 9.5rem;
  }

  .flaconi-products__brand {
    display: block;
    text-align: center;
    word-break: break-word;
    font-weight: 700;
    text-transform: initial;
    font-size: 16px;
    line-height: 24px;
  }

  .flaconi-products__name {
    display: block;
    text-align: center;
    word-break: break-word;
    font-weight: 700;
    overflow: inherit;
    white-space: inherit;
    text-overflow: ellipsis;
    text-transform: initial;
    font-size: 16px;
    line-height: 24px;
  }

  .flaconi-products__type {
    display: block;
    text-align: center;
    word-break: break-word;
    overflow: inherit;
    white-space: inherit;
    text-overflow: ellipsis;
    text-transform: initial;
    font-size: 16px;
    line-height: 1.5rem;
    letter-spacing: 0.012rem;
    color: rgb(105, 103, 107);
    width: 100%;
    margin-bottom: 0.25rem;
    font-weight: 400;
  }

  .flaconi-products__price {
    width: 100%;
    display: block;
    text-align: center;
    white-space: nowrap;
    font-size: 16px;
    line-height: 1.5rem;
  }

  .flaconi-products__price-per-unit {
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: 0.009rem;
    width: 100%;
    color: rgb(105, 103, 107);
    display: block;
    margin-top: 0.25rem;
    text-align: center;
    white-space: nowrap;
    font-weight: 400;
  }

  .product-list-enter-active, .product-list-leave-active {
    transition: opacity 0.1s;
  }

  .product-list-enter, .product-list-leave-to {
    opacity: 0;
  }

  .custom-select {
    appearance: none; /* Hide the default select arrow */
    background-color: #ffffff; /* Background color */
    border: 1px solid #cccccc; /* Border color */
    border-radius: 4px; /* Border radius */
    padding: 8px; /* Padding */
    font-size: 1rem; /* Font size */
    width: 100%; /* Full width */
    cursor: pointer; /* Cursor style */
  }

  /* Style the select arrow */
  .custom-select::after {
    content: '\25BC'; /* Unicode character for the down arrow */
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    pointer-events: none; /* Prevent click on the arrow */
  }

  /* Hover effect for the select box */
  .custom-select:hover {
    border-color: #aaaaaa;
  }

  /* Focus effect for the select box */
  .custom-select:focus {
    outline: none; /* Remove default focus outline */
    border-color: #007bff; /* Border color on focus */
  }

  /* Style the options */
  .custom-select option {
    padding: 8px;
  }
</style>
