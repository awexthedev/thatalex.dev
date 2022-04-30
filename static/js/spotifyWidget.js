async function getState() {
    const data = await fetch("https://api.thatalex.dev/v0/web/spotify/player/state", {
        method: "GET"
    }).then(response => response.json())
    .catch(async function(response) {
        const d = await response.json();
        if (response.status == 401 && d.message == "Access Token was invalid. Token was refreshed & next request should succeed.") {
            location.reload();
        } else if (response.status != 200 || response.status != 204) {
            console.log(`Uh oh, a little fucky wucky owo occurred\n\n${d}`)
            document.getElementById("songContent").innerHTML = `<p style="color:red;">Uh oh! There was an error fetching song content.<br>The API may be temporarily down.</p>`
        }
    });
   
    if(data.playing) document.getElementById("songContent").innerHTML = `<p><strong>${data.data.songData.songName}</strong> by <strong>${data.data.songData.artists[0].name}</strong> at <strong>${data.data.device.volume}%</strong> volume.`
    else document.getElementById("songContent").innerHTML = `<p><strong>${data.data.songData.songName}</strong> by <strong>${data.data.songData.artists[0].name}</strong> is <strong>paused</strong>.`
}