import * as THREE from 'three'
import fragmentShader from '../glsl/main.frag'
import vertexShader from '../glsl/main.vert'
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { gsap } from 'gsap';
import Card from './card';
import Raycaster from './raycaster';

class World {

  constructor(container) {
    this.clock = new THREE.Clock()
    // Scene
    this.scene = new THREE.Scene()

    // sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    this.camera.position.set(0, 0, 10)
    this.scene.add(this.camera)

    this.uniforms = {
      time: { value: 1.0 }
    }

    const loader = new THREE.CubeTextureLoader()
    loader.setPath('https://threejs.org/examples/textures/cube/Bridge2/')
    const textureCube = loader.load([ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ])

    // this.scene.background = textureCube

    this.addObjects()

    this.renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
    })
    this.renderer.setSize(sizes.width, sizes.height)


    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.raycaster = new Raycaster(this.scene, this.camera)
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this))

    const t = this.clock.getElapsedTime() * 2
    this.uniforms.time.value = t
    this.controls.update()

    this.scene.traverse((obj) => {
      if (obj.render) obj.render(t)
    })

    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera)

  }

  async addObjects() {

   
    const loader = new THREE.FileLoader()
    const objectsArray = JSON.parse(await loader.loadAsync('data/files.json'))
    
    let xres = 12
    let yres = 8
    let width = window.innerWidth*0.01
    let height = window.innerHeight*0.01

    console.log(objectsArray.length)

    for(let i = 0; i < objectsArray.length; i++) {
      let filePath = objectsArray[i].filePath
      let texture = await (new THREE.TextureLoader()).loadAsync(filePath)
      

      let xn = (i%xres)/xres * 2 - 1 + 1/xres/2
      let yn = (Math.floor(i/xres))/yres * 2 - 1 + 1/yres/2
      
      let x = xn * width
      let y = yn * height

      // console.log(`x pos: ${x}, y pos: ${y}`)
      const plane = new Card({x: x, y: y, texture: texture})
      this.scene.add(plane)
      

    }

    // let filePath = objectsArray[0].filePath
    // let texture = new THREE.TextureLoader().load(filePath)
    // const mainPlane = new Card({x: -5, y: -5, z: 2, radius: 0, width: 10, height: 10, texture: texture})
    // this.scene.add(mainPlane)

  }

}

export default World