<template>
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <!-- {{ images }} -->
        <div class="carousel-inner">
            <div class="carousel-item active" v-for = '(image, index) in images' :key=index>
                <img :src = 'getpath(image)' class="d-block w-100" alt="...">
            </div>
        <!-- </div>  -->
            <!-- <div class="carousel-item">
                <img src="../assets/images/shirt.jpg" class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="../assets/images/phone.jpg" class="d-block w-100" alt="...">
            </div> -->
        </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
</template>

<script>
    export default {
        name: 'slider-trial',
        props: ['images'],
        data: () => {
            return {
                paths: []
            }
        },
        created()
        {
            console.log(this.images);
            // this.paths = this.images.split(',');
        },
        methods: {
            getpath(path)
            {
                return require ('../assets/images/' + path);
            }
        }
    }
</script>

<style scoped>
    img{
        width: 12px;
        height: 500px;
    }
</style>