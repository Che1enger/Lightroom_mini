const fileInput = document.getElementById('fileInput');
const uploadedImage = document.getElementById('uploadedImage');
const imageContainer = document.getElementById('image');
const saturateSlider = document.getElementById('saturateSlider');
const saturate_demo = document.getElementById('saturate_demo');
const bright = document.getElementById('bright');
const bright_demo = document.getElementById('bright_demo');
const temperatureSlider = document.getElementById('temperatureSlider');
const temperature_demo = document.getElementById('temperature_demo');
const contrast = document.getElementById('contrast');
const contrast_demo = document.getElementById('contrast_demo');
fileInput.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});




window.addEventListener('resize', function () {
    if (uploadedImage.width / uploadedImage.height > imageContainer.clientWidth / imageContainer.clientHeight) {
        uploadedImage.style.width = '100%';
        uploadedImage.style.height = 'auto';
    } else {
        uploadedImage.style.width = 'auto';
        uploadedImage.style.height = '100%';
    }
});

window.dispatchEvent(new Event('resize'));

imageContainer.addEventListener('click', function () {
    fileInput.click();
});



document.getElementById('button1').addEventListener('click', function() {
    showSection('section1');
});

document.getElementById('button2').addEventListener('click', function() {
    showSection('section2');
});
document.getElementById('button3').addEventListener('click', function() {
    showSection('section3');
});



function showSection(sectionId) {
    var sections = document.querySelectorAll('.section-content');
    sections.forEach(function(section) {
        section.style.display = 'none'; 
    });

    var targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';  
    }
}


function applyTemperature() {
  const value = temperatureSlider.value;

  if (value < 0) {
    imageContainer.classList.add('cold');
    imageContainer.classList.remove('hot');
  } else {
    imageContainer.classList.remove('cold');
    imageContainer.classList.add('hot');
  }
}


 
function updateSaturate() {
    const saturateValue = saturateSlider.value;
    saturate_demo.textContent = saturateSlider.value;
    return `saturate(${saturateValue}%)`;
}

 
function updateBrightness() {
    const value = bright.value;
    bright_demo.textContent = bright.value;
    return `brightness(${value}%)`;
}

 
function updateContrast() {
    const contrastValue = contrast.value;
    contrast_demo.textContent = contrast.value;
    return `contrast(${contrastValue}%)`;
}

const hueRotateSlider = document.getElementById('hueRotateSlider');
const hueRotate_demo = document.getElementById('hueRotate_demo');

function updateHueRotate() {
    const hue_value = hueRotateSlider.value;
    hueRotate_demo.textContent = hueRotateSlider.value;
    return `hue-rotate(${hue_value}deg)`;
}



 
function updateTemperature() {
    const temperatureValue = temperatureSlider.value;
    temperature_demo.textContent = temperatureValue;
    if (temperatureValue > 0) {
        return `sepia(${temperatureValue}%)`;
    } else {
        const invertedValue = -temperatureValue;
        return `sepia(${invertedValue}%) grayscale(100%)`;
    }
}


function updateCombinedFilters() {
    const filters = [
        updateSaturate(),
        updateBrightness(),
        updateContrast(),
        updateTemperature(),
        updateHueRotate()
    ];

    const combinedFilter = filters.join(' ');

    
    imageContainer.style.cssText = `filter: ${combinedFilter};`;
}

saturateSlider.addEventListener('input', updateCombinedFilters);
bright.addEventListener('input', updateCombinedFilters);
contrast.addEventListener('input', updateCombinedFilters);
temperatureSlider.addEventListener('input', updateCombinedFilters);
hueRotateSlider.addEventListener('input', updateCombinedFilters);

updateCombinedFilters();




const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', applyFilter);
  });

  function applyFilter(event) {
    const filter = event.currentTarget.getAttribute('data-filter');
    const filterStyle = generateFilterStyle(filter);
    
    
    uploadedImage.style.filter = filterStyle;
  }

  function generateFilterStyle(filter) {
    switch (filter) {
      case 'sepia':
        return 'sepia(1)';
      case 'grayscale':
        return 'grayscale(1)';
      case 'sunny':
        return 'brightness(1.2) contrast(1.2)';
      case 'darky':
        return 'brightness(0.8) contrast(0.8)';
      case 'blur':
        return 'blur(3px)';
      case 'invert':
        return 'invert(1)';
      default:
        return 'none';
    }
  }


  const button4 = document.getElementById('button4');

button4.addEventListener('click', removeAllFilters);

function removeAllFilters() {
    imageContainer.style.cssText = 'filter: none;';
    uploadedImage.style.cssText = 'filter: none; width: 100%; height: 100%;';

    hueRotateSlider.value = hueRotateSlider.defaultValue;
    hueRotate_demo.textContent = hueRotateSlider.value;

    temperatureSlider.value = temperatureSlider.defaultValue;
    temperature_demo.textContent = temperatureSlider.value;

    saturateSlider.value =  saturateSlider.defaultValue;
    saturate_demo.textContent =  saturateSlider.value;

    bright.value = bright.defaultValue;
    bright_demo.textContent = bright.value;

    contrast.value = contrast.defaultValue;
    contrast_demo.textContent = contrast.value;

    slider.value = slider.defaultValue;
    vignette_demo.textContent = slider.value;

    slider1.value = slider1.defaultValue;
    vignette_demo1.textContent = slider1.value;

    slider2.value = slider2.defaultValue;
    vignette_demo2.textContent = slider.value;

    slider3.value = slider3.defaultValue;
    vignette_demo3.textContent = slider3.value;
    
    vignette.style.cssText = ' '
}





const slider = document.getElementById('vignetteSlider');
const slider1 = document.getElementById('vignetteSlider1');
const slider2 = document.getElementById('vignetteSlider2');
const slider3 = document.getElementById('vignetteSlider3');
const vignette = document.querySelector('.vignette');
const vignette_demo = document.getElementById('vignette_demo');
const vignette_demo1 = document.getElementById('vignette_demo1');
const vignette_demo2 = document.getElementById('vignette_demo2');
const vignette_demo3 = document.getElementById('vignette_demo3');

slider.addEventListener('input', updateVignette);
slider1.addEventListener('input', updateVignette1);
slider2.addEventListener('input', updateVignette2);
slider3.addEventListener('input', updateVignette3);

function updateVignette() {
  const intensity = slider.value;
  const vignetteOpacity = mapValue(intensity, 0, 200, 0.8, 0);
  vignette.style.background = `radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,${vignetteOpacity}) 100%)`;
  vignette_demo.textContent = slider.value;
}

function updateVignette1() {
    const intensity = slider1.value;
    const vignetteOpacity = mapValue(intensity, 0, 200, 0.8, 0);  
    vignette.style.background = `radial-gradient(ellipse at center, rgba(255,255,255,0) 40%, rgba(255,255,255,${vignetteOpacity}) 100%)`;
    vignette_demo1.textContent = slider1.value;
}
function updateVignette2() {
    const intensity = slider2.value;
    const vignetteOpacity = mapValue(intensity, 0, 200, 0, 0.8);  
    vignette.style.background = `radial-gradient(ellipse at center, rgba(0,0,0,${vignetteOpacity}) 40%, rgba(0,0,0,0) 100%)`;
    vignette_demo2.textContent = slider2.value;
}
function updateVignette3() {
    const intensity = slider3.value;
    const vignetteOpacity = mapValue(intensity, 0, 200, 0, 0.8);  
    vignette.style.background = `radial-gradient(ellipse at center, rgba(255,255,255,${vignetteOpacity}) 40%, rgba(255,255,255,0) 100%)`;
    vignette_demo3.textContent = slider3.value;
}

function mapValue(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


window.addEventListener('load', function() {
  updateVignette();
});


const downloadButton = document.getElementById('button5'); 
const downloadLink = document.createElement('a');
document.body.appendChild(downloadLink); 

downloadButton.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;
    const context = canvas.getContext('2d');
    context.filter = imageContainer.style.filter; 
    context.drawImage(uploadedImage, 0, 0, uploadedImage.width, uploadedImage.height);
    const dataURL = canvas.toDataURL('image/png'); 
    downloadLink.href = dataURL;
    downloadLink.download = 'filtered_image.png';

    
    downloadLink.click();
});

