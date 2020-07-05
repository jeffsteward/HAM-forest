class Apparatus {
    constructor(containerElement, packetUri) {
        this.id = (Math.floor(new Date() / 1000)).toString(36);
        this.packetUri = packetUri;
        this.height = 385;
        this.width = 385;

        this.manifest =  '';
        this.manifestUri = '';
        this.imageInfoUri = '';
        this.imageUri = '';
        this.objectID = 0;
        this.scaleFactor = 0;
        
        this.annotations = [
            {name: 'leaf', color: 'green', x: 0, y: 0, width: 50, height: 50, fragment: '', imageUrl: "", id: `${this.id}_leaf`},
            {name: 'branch', color: 'red', x: 0, y: 0, width: 25, height: 150, fragment: '', imageUrl: "", id: `${this.id}_branch`}
        ];        

        this._sizerBoxWidth = 10;
        this._maxScaleWidth = 100;

        this._currentManifestIndex = 0;
        this._collection;
        
        this.parentElement = containerElement;
        this.container;
        this.toolbar;
        this.buttonNext;
        this.buttonPrevious;
        this.buttonCast;
        this.loader;
        this.image;
        this.annotationLayer;
        
        this._createElements();
        this._getCollection();
    }
 
    _createElements() {
        this.container = document.createElement('section');
        this.container.style.position = 'relative';

        this.toolbar = document.createElement('span');
        this.toolbar.style.display = 'flex';
        this.toolbar.style.width = '100%';
        this.toolbar.style.margin = '5px 0px 5px 0px';
        this.toolbar.style.visibility = 'hidden';
        
        this.buttonNext = document.createElement('button');
        this.buttonNext.innerHTML = '&gt;&gt;&gt;';
        this.buttonNext.setAttribute('id', `${this.id}_buttonNext`);
        this.buttonNext.style.background = 'none';
        this.buttonNext.style.color = '#ffffff';        
        this.buttonNext.addEventListener('click', this._nextImage.bind(this));
        
        this.buttonPrevious = document.createElement('button');
        this.buttonPrevious.innerHTML = '&lt;&lt;&lt;';
        this.buttonPrevious.setAttribute('id', `${this.id}_buttonPrevious`);
        this.buttonPrevious.style.background = 'none';
        this.buttonPrevious.style.color = '#ffffff';
        this.buttonPrevious.addEventListener('click', this._previousImage.bind(this));
        
        this.buttonCast = document.createElement('button');
        this.buttonCast.innerHTML = 'cast it to the wind';
        this.buttonCast.setAttribute('id', `${this.id}_buttonPrevious`);
        this.buttonCast.style.background = 'none';
        this.buttonCast.style.color = '#ffffff';
        this.buttonCast.style.marginLeft = '10px';
        this.buttonCast.addEventListener('click', this._cast.bind(this));
        
        this.toolbar.append(this.buttonPrevious);
        this.toolbar.append(this.buttonNext);
        this.toolbar.append(this.buttonCast);

        this.image = document.createElement('img');
        this.image.setAttribute('id', `${this.id}_image`);
        this.image.height = this.height;
        this.image.style.visibility = 'hidden';
        
        this.loader = document.createElement('img');
        this.loader.setAttribute('src', '/resources/images/loader-bar.gif');
        this.loader.style.position = 'absolute';

        this.container.append(this.loader);
        this.container.append(this.toolbar);
        this.container.append(this.image);

        let dragMove = d3.drag()
                    .on('end', this._dragEnded.bind(this))
                    .on('drag', this._dragged.bind(this));

        let dragResize = d3.drag()
                    .on('drag', this._scaleAnnotation.bind(this));

        this.annotationLayer = d3.select(this.container)
                                    .append('svg')
                                    .attr('id', `${this.id}_annotationLayer`)
                                    .style('visibility', 'hidden')
                                    .style('position', 'absolute');
                            
        let annotationGroups = this.annotationLayer.selectAll('g')
                                            .data(this.annotations)
                                        .enter().append('g');

        // the box containing the annotation
        annotationGroups.append('rect')
            .attr('stroke', (d) => {return d.color})
            .attr('stroke-width', 5)
            .attr('fill', 'transparent')
            .attr('cursor', 'move')
            .attr('x', (d) => {return d.x})
            .attr('y', (d) => {return d.y})
            .attr('width', (d) => {return d.width})
            .attr('height', (d) => {return d.height})
            .attr('id', (d) => {return d.id})
            .call(dragMove);
            
        // the drag hangle for resizing the annotation
        annotationGroups.append('rect')
            .attr('fill', (d) => {return d.color})
            .attr('fill-opacity', 0.5)
            .attr('cursor', 'se-resizE')
            .attr('x', (d) => {return d.width - (this._sizerBoxWidth/2)})
            .attr('y', (d) => {return d.height - (this._sizerBoxWidth/2)})
            .attr('width', this._sizerBoxWidth)
            .attr('height', this._sizerBoxWidth)
            .attr('id', (d) => {return `${d.id}_sizer`})
            .call(dragResize);
                            
        this.parentElement.append(this.container);
    }

    _getCollection() {
        manifesto.loadManifest(this.packetUri).then((manifest) => {
            let c = manifesto.create(manifest);
            if (c.isCollection()) {
                this._collection = c;
                if (this._collection.getManifests().length > 0) {
                    this._showImage(this._collection.getManifests()[this._currentManifestIndex].getProperty('id'));
                }
            }
        });
    }

    _showImage(manifestUri) {
        manifesto.loadManifest(manifestUri).then((manifest) => {
            this.manifestUri = manifestUri
            this.manifest = manifest;
    
            let m = manifesto.create(this.manifest);
            let s = m.getSequences()[0];
            let c = s.getCanvasByIndex(0);
            let i = c.getImages()[0];
    
            this.objectID = this._getObjectIdFromManifestUri(this.manifestUri);
    
            this.imageInfoUri = i.getResource().getServices()[0].getInfoUri();
            this.imageUri = i.getResource().getServices()[0].getProperty('@id');
            
            let imageHeight = this.height;
            if (i.getResource().getHeight() < this.height) {
                imageHeight = i.getResource().getHeight();
            }
            this.scaleFactor = i.getResource().getHeight()/imageHeight;
    
            let imageURL = `${this.imageUri}/full/,${imageHeight}/0/default.jpg`;

            this.image.onload = this._initializeAnnotations.bind(this);
            this.image.setAttribute('src', imageURL);
        });
    }

    _nextImage(e) {
        this._currentManifestIndex +=1;
        if (this._currentManifestIndex >= this._collection.getManifests().length) {
            this._currentManifestIndex = 0;
        }
        this._showImage(this._collection.getManifests()[this._currentManifestIndex].getProperty('id'));
    }
    
    _previousImage(e) {
        this._currentManifestIndex -=1;
        if (this._currentManifestIndex < 0) {
            this._currentManifestIndex = this._collection.getManifests().length - 1;
        }
        this._showImage(this._collection.getManifests()[this._currentManifestIndex].getProperty('id'));
    }

    _initializeAnnotations() {
        // turn off the loader animation
        this.loader.style.visibility = 'hidden';

        // turn on the toolbar and image 
        this.image.style.visibility = 'visible';
        this.toolbar.style.visibility = 'visible';

        let targetImage = this.image;
        // resize the SVG window to exact dimensions of the underlying image
        this.annotationLayer.attr('width', targetImage.offsetWidth)
                       .attr('height', targetImage.offsetHeight)
                       .style('top', targetImage.offsetTop)
                       .style('left', targetImage.offsetLeft)
                       .style('visibility', 'visible');

        this._moveAnnotationInbounds(`#${this.annotations[0].id}`);
        this._moveAnnotationInbounds(`#${this.annotations[1].id}`);
    }

    _moveAnnotationInbounds(annotation) {
        // check the annotation against its parent container
        // if it's out of bounds in any direction, move it inbounds
        let targetImage = this.image;
        let a = d3.select(annotation);
        let bbox = a.node().getBBox();
        let x = bbox.x;
        let y = bbox.y;
        if ((bbox.x + bbox.width) > targetImage.offsetWidth) {
            x = targetImage.offsetWidth - bbox.width; 
        }
        if (bbox.x < 0) {
            x = 0; 
        }
        if ((bbox.y + bbox.height) > targetImage.offsetHeight) {
            y = targetImage.offsetHeight - bbox.height; 
        }
        if (bbox.y < 0) {
            y = 0; 
        }
    
        d3.select(`${annotation}_sizer`)
            .transition()
                .duration(250)
                .attr('x', x + bbox.width - (this._sizerBoxWidth/2))
                .attr('y', y + bbox.height - (this._sizerBoxWidth/2));

        a.transition()
            .duration(250)
            .attr('x', x)
            .attr('y', y)
            .on('end', () => {this._updateAnnotation(annotation)});
    }
    
    _updateAnnotation(annotation) {
        let bbox = d3.select(annotation).node().getBBox();
        let index = (annotation.indexOf('leaf') > 0 ? 0 : 1); 
        
        this.annotations[index].x = bbox.x;
        this.annotations[index].y = bbox.y;
        this.annotations[index].width = bbox.width;
        this.annotations[index].height = bbox.height;
        this.annotations[index].fragment = Math.round(bbox.x * this.scaleFactor) + ',' + Math.round(bbox.y * this.scaleFactor) + ',' + Math.round(bbox.width * this.scaleFactor) + ',' + Math.round(bbox.height * this.scaleFactor);    
        this.annotations[index].imageUrl = `${this.imageUri}/${this.annotations[index].fragment}/full/0/default.jpg`;
    }
    
    _scaleAnnotation(d) {      
        let annotation = d3.select(`#${d.id}`);
        let annotationSizer = d3.select(`#${d.id}_sizer`);    
        let scaleFactor = (d.height / d.width);

        let dragY = 0;
        let dragX = 0;
        let width;
        let height;

        // is it more vertical than horizontal
        if (scaleFactor > 1.0) {
            dragX = Math.max(d.x + 15, Math.min(d.x + (this._maxScaleWidth/2), (d.x + d.width + d3.event.dx)));
        } else {
            dragX = Math.max(d.x + 15, Math.min(d.x + this._maxScaleWidth, (d.x + d.width + d3.event.dx)));
        }
        width = dragX - d.x;
        height = width * scaleFactor;
        dragY = d.y + height;

        annotationSizer.attr('x', dragX - (this._sizerBoxWidth/2))
                        .attr('y', dragY - (this._sizerBoxWidth/2));

        annotation.attr('width', width)
                    .attr('height', height);

        this._updateAnnotation(`#${d.id}`);
    }
    
    _dragged(d) {
        d3.select(`#${d.id}`)
            .attr('x', d3.event.x)
            .attr('y', d3.event.y);

        d3.select(`#${d.id}_sizer`)
            .attr('x', d3.event.x + d.width - (this._sizerBoxWidth/2))
            .attr('y', d3.event.y + d.height - (this._sizerBoxWidth/2));
    }    

    _dragEnded(d) {
        this._moveAnnotationInbounds(`#${d.id}`);
    }

    _cast() {
        let data = {
            gameID: game.gameID,
            action: 'cast',
            packet: {
                objectID: this.objectID,
                annotations: this.annotations
            }
        };
        
        socket.emit('take-action', data);
    }

    _getObjectIdFromManifestUri(manifestUri) {
        return parseInt(manifestUri.replace('https://iiif.harvardartmuseums.org/manifests/object/',''));
    }

}