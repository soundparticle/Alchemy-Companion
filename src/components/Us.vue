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
            <img src="../assets/ryanluras.png" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>Ryan Luras</b></h4>
                <p>Art and Design has been at the center of Ryan's interests since childhood. Likewise, building and creating plays an important role in what makes him tick.  Excited to grow and learn as much as possible, he looks forward to combining these skills in new and interesting ways.</p>
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card {
    max-width: 200px;
    background: rgb(208, 232, 240);
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
}
</style>
