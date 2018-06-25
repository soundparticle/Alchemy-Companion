<template>
    <div>
        <h2>Our Developers</h2>
        <div id="team-flex">
            <div class="card">
                <img src="../assets/arthur-jen.jpg" alt="Avatar" style="width:100%">
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
                <img src="../assets/easton.jpg" alt="Avatar" style="width:100%">
                <div class="container">
                    <h4><b>Easton Gorishek</b></h4>
                    <p>Easton is a 27 year old who enjoys travelling abroad experiencing new cultures. Besides being a fulltime student at Alchemy Code Lab he enjoys running, and occasionally playing gambling games with friends. He looks forward to taking his skills learned from ACL on to develop exciting and interesting applications</p>
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
