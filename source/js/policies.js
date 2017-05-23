export default function outputPolicies(error, data) {
    if (error) {
        console.error(':(', error);
        return;
    }
    console.log('data', data);

    const ul = document.getElementsByClassName('policies-list')[0];
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement('li');
        li.innerHTML = `<strong>${data[i].title}</strong> : ${data[i].text}` ;
        ul.appendChild(li);
    }
};
