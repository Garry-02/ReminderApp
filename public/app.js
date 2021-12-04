
document.getElementById("file").addEventListener("change", (ev) => {
    ev.preventDefault();
    console.log("i was run")
    const formdata = new FormData();
    formdata.append("image", ev.target.files[0]);
    fetch("http://localhost:3002/uploads", {
      method: "POST",
      body: formdata,
    })
      .then((data) => data.json())
      .then((data) => location.reload());
  });


