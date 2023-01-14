import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"



let width = Number(prompt("창고의 너비를 입력하세요"))
let length = Number(prompt("창고의 길이를 입력하세요"))

class App{
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;
        const renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;


        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }
     _setupControls(){
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupCamera(){
        // three.js가 3차원 그래픽을 출력할 영역의 가로, 세로 크기를 가져오기
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        // 카메라 객체 생성
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );

        camera.position.y = 1;
        camera.position.z = length/2;
        this._camera = camera;
    }
    _setupLight(){
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color,intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }
    // 파란색 정육면체 mesh 생성
    _setupModel(){
        
        const watehouse_x = width;
        const watehouse_y = length;
        const wareHouse = new THREE.Object3D();
        const planeGeometry = new THREE.PlaneGeometry(watehouse_x,watehouse_y,watehouse_x,watehouse_y)
    
        const wareHouseMaterial = new THREE.MeshPhongMaterial({
            emissive:0x888888, 
            flatShading:true,
            side : THREE.DoubleSide,
            visible:false
        })
        const group1 = new THREE.Group();
        const wareHouseMesh = new THREE.Mesh(planeGeometry,wareHouseMaterial);
         // 노란색 라인 생성
        const lineMaterial = new THREE.LineBasicMaterial({color: 0xa0a0a0});
        const line = new THREE.LineSegments(
         // WireframeGeometry : 모델의 외각선 표시
         new THREE.WireframeGeometry(planeGeometry),lineMaterial);
        
        
        //=====================================================================
        // 하이라이트 모양과 위치 잡기 
        wareHouseMesh.name = 'ground'

        const highlightMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1,1),
            new THREE.MeshBasicMaterial({
                side : THREE.DoubleSide
            })
        )
        highlightMesh.position.set(0.5,0.5,0)

        // 마우스 호버 이벤트 넣기
        group1.add(highlightMesh)
        
        const mousePosition = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        let hover_camera = this._camera;
        let hover_scene = this._scene;

        let intersects;
        window.addEventListener('mousemove',function(e){
            mousePosition.x = (e.clientX / window.innerWidth)*2-1;
            mousePosition.y = -(e.clientY / window.innerHeight)*2+1;
            raycaster.setFromCamera(mousePosition, hover_camera);
            intersects = raycaster.intersectObjects(hover_scene.children)
            intersects.forEach(function(intersect){
                if(intersect.object.name === 'ground'){
                    const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                    highlightMesh.position.set(highlightPos.x,-highlightPos.z,0)
                }
            })
        })

        
        //=====================================================================
        
        
         group1.add(wareHouseMesh);
        group1.add(line);
        // 판 돌리기
        group1.rotation.x =-Math.PI/2;


        wareHouse.add(group1);
    
        const mesh = wareHouse
        mesh.position.set(0,0,0);

        this._scene.add(mesh);
    
        this._warehouse = wareHouse
        // this._createShelfs(watehouse_x,watehouse_y);


    }

    // 창의 크기가 변경될때 발생하는 이벤트
    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width,height);
    }
    
    // time : 렌더링이 처음 시작된 이후 경과된 시간(ms 단위)
    // time은 requestAnimationFrame 함수가 render함수에 전달해준 값이다
    render(time){
        // 랜더링 시에 scene을 카메라의 시점으로 렌더링하도록 만드는 장치
        this._renderer.render(this._scene, this._camera);
        // 속성값을 변경시켜 애니메이션 효과를 만드는 장치
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    update(time){
        time *= 0.001;  // 알아보기 쉽게 ms단위를 초단위로 변경
    }

}

window.onload = function(){
    new App();
}



