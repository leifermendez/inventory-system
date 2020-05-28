import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Schema} from "prosemirror-model";
import { schema } from "ngx-editor";
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() content: string;
  public form: FormGroup;
  jsonDoc = `<p><b>aaaaaa</b></p>`;

  editorContent: object = {
    type: 'doc',
    content: []
  };

  editorContentChange(doc: object) {
    this.editorContent = doc;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // this.parseText()
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
    // this.form.patchValue({content:'Ready!'})

  }

  parseText = () => {
     // const contentNode = schema.nodeFromJSON(jsonDoc);
    this.editorContent = new Schema({
      nodes: {
        text: {},
        doc: {content: "text*"}
      }
    })
  }
}
