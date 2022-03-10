function fileDrop(ev) {
    ev.preventDefault();

    // Get file from drop event
    let file;
    if (ev.dataTransfer.files) {
        file = ev.dataTransfer.files[0];
    } else if (ev.dataTransfer.items) {
        if (ev.dataTransfer.items[0].kind === 'file') {
            file = ev.dataTransfer.items[0].getAsFile();
        }
    } else return;

    // Read file
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        let final = [];
        for (let line of Cp437Helper().convertToUTF8(reader.result).split('\n')) {
            final.push(line.trimEnd());
        }

        document.getElementById('content').textContent = final.join("\n");
    }, false);

    if (file) {
        reader.readAsArrayBuffer(file);
    }
}