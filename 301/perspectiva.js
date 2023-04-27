
    
      // Crear una escena
      const scene = new THREE.Scene();

      // Crear una cámara
      const camera = new THREE.PerspectiveCamera(
        75, // ángulo de visión
        window.innerWidth / window.innerHeight, // relación de aspecto
        0.1, // distancia cercana de renderizado
        1000 // distancia lejana de renderizado
      );

      // Crear un renderizador
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      // Crear ejes principales XYZ
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      // Crear malla de plano XZ
      const planeGeometry = new THREE.PlaneGeometry(10, 10, 10, 10);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xaaaaaa,
        wireframe: true,
      });
      const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      planeMesh.rotation.x = -Math.PI / 2;
      scene.add(planeMesh);
       //aplicacion de una luz dirrecional a la escena

       var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
       directionalLight.position.set(0, 0, -10);
       scene.add( directionalLight );

       var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
       directionalLight.position.set(0, 0, 10);
       scene.add( directionalLight );
			  
       // la piramide personalizada
       lado=40;
       l=2*lado;
       h=50;
      [v1,v2,v3,v4,v5]=[[0,0,0],[lado,0,0],[lado,0,lado],[0,0,lado],[lado/2,h,lado/2]];
        vertices=[v1,v2,v3,v4,v5,v1,v4,v3,v5,v2];//Secuencia  de vertices
       geom= new THREE.BufferGeometry(vertices);
   

// arreglo de color y material de los objetos
      const color = [{color:0x33B5FF}];     
      const material=[new THREE.MeshMatcapMaterial(color[0])];
      

//se aplican los arreglos de geometria y material al objeto 

      const cube =[];
      for (let i=0; i<3; i++) {
          cube.push(new THREE.Mesh(new THREE.BufferGeometry, material[i]));
      }

// arreglo que añade los objetos a la escena

      for (let i=0; i<3; i++) {
          scene.add( cube[i] );
      }


            // Agregar controles de órbita
      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.update();

      // Ubicar la cámara
      camera.position.set(0, 5, 10);

      // Renderizar la escena
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();

      // Manejar el tamaño de la ventana
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    