<template>
  <div>
    <audio
      id="audio"
      src="src\assets\柯柯柯啊 - 姑娘在远方.mp3"
      controls
      @click="play()"
      ref="audioElement"
    ></audio>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const audioElement = ref(null)
    const canvas = ref(null)
    let audioContext = null
    let analyserNode = null
    const frequencyData = ref(new Uint8Array())

    const draw = (analyserNode, frequencyData, ctx, canvasElement) => {
      requestAnimationFrame(() =>
        draw(analyserNode, frequencyData, ctx, canvasElement)
      )

      analyserNode.getByteFrequencyData(frequencyData.value)

      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)

      const bufferLength = analyserNode.frequencyBinCount
      const barWidth = (canvasElement.width / bufferLength) * 2.5
      let posX = 0

      frequencyData.value.forEach((value) => {
        const percent = value / 255
        const height = canvasElement.height * percent
        const offset = canvasElement.height - height - 1

        const red = value
        const green = value * 0.5
        const blue = 255

        ctx.fillStyle = `rgb(${red},${green},${blue})`
        ctx.fillRect(posX, offset, barWidth, height)

        posX += barWidth + 1
      })
    }

    onMounted(() => {
      const audio = audioElement.value
      const canvasElement = canvas.value

      if (audio && canvasElement) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)()
        analyserNode = audioContext.createAnalyser()
        const source = audioContext.createMediaElementSource(audio)

        source.connect(analyserNode)
        analyserNode.connect(audioContext.destination)

        const ctx = canvasElement.getContext('2d')
        frequencyData.value = new Uint8Array(analyserNode.frequencyBinCount)

        draw(analyserNode, frequencyData, ctx, canvasElement)
      }
    })

    return {
      audioElement,
      canvas,
      frequencyData
    }
  }
}
</script>

<style scoped>
/* Add any necessary styles here */
</style>
