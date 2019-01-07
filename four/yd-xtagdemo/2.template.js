<template id="template">
<p>Smile!</p>
</template>

<script>
const fragment = document.getElementById('template').content.cloneNode(true);
fragment.firstChild.textContent += "yideng";
document.body.appendChild(fragment);
</script>