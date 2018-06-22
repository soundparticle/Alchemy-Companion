<template>
<div>
    <h2>Our Developers</h2>
    <div id="team-flex">
        <div class="card">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>Arthur Jen</b></h4>
                <p>Arthur is a 30 year old human who enjoys bouldering, biking, board games, and video games. His favorite foods include ramen with extra noodles, fried chicken sandwiches, authentic Chinese food, sushi, eggs benedict, and beer. Arthur is currently working on his About paragraph.</p>
            </div>
        </div>
        <div class="card">
            <img class="testimg" src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>Ryan Luras</b></h4>
                <p>About Ryan coming soon! Loremioremaxime. Harum assumenda similique praesentium dolorem perferendis optio soluta quod eum labore odio non eligendi.</p>
            </div>
        </div>
        <div class="card">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>Easton Gorishek</b></h4> 
                <p>About Easton coming soon! entium dolorem perferendis optio soluta quod eum labore odio non eligendi.</p>
            </div>
        </div>
        <div class="card">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>Antreo Pukay</b></h4>
                <p>About Antreo coming soon! Lorem ipsum  quod eum laborerem ipsum  quod eum labrem ipsum  quod eum lab odio non eligendi.</p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

};
</script>

<style scoped>
#team-flex {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: start;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
}

.card {
    max-width: 300px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    padding: 10px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
img {
  max-width: 300px;
}
</style>
