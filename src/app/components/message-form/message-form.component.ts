import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@app/models';
import { ChatService } from '@app/services';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('message')
  private message : Message;

  @Input('messages')
  private messages : Message[];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.messages.subscribe(msg => {
      this.messages.push(
            new Message(JSON.stringify(msg.content), 'assets/images/bot.png', new Date())
          );
    })
  }

  public sendMessage(): void {
    this.message.timestamp = new Date();
    this.messages.push(this.message);
    this.chatService.sendMsg(this.message);
    // this.chatService.sendMsg(this.message.content).subscribe(res => {
    //   this.messages.push(
    //     new Message(res.result.fulfillment.speech, 'assets/images/bot.png', res.timestamp)
    //   );
    // });

    this.message = new Message('', 'assets/images/user.png');
  }

}
