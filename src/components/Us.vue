<template>
<div>
    <h2>Our Developers</h2>
    <div id="team-flex">
        <div class="card">
            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>Arthur Jen</b></h4>
                <p>About Arthur coming soon! Loremium s culpa qususcipit atque nobis facilis nesciunt illum, quod odit maxime. Harum assumenda similique praesentium dolorem perferendis optio soluta quod eum labore odio non eligendi.</p>
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
            <img src="https://media.licdn.com/dms/image/C5103AQHwexqLVJWX4g/profile-displayphoto-shrink_200_200/0?e=1534982400&v=beta&t=q7HeXEDgsitEWlGdab_RwVWFjtqQaXKlBXquwf6teyE" alt="Avatar" style="width:100%">
            <div class="container">
                <h4><b>Antreo Pukay</b></h4>
                <p>Antreo is a full-stack web developer based in Portland, OR. He was a student at The Alchemy Code Lab in 2018. The front-end side of development excites him the most. He's also an experienced recording engineer who continues that on the side so he has a creative bent and gets especially excited when he's involved with web development projects with companies or organizations that are involved in the arts. He loves working together with others to create things that move people or impact their lives in a positive way!</p>
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
