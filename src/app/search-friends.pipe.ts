import { Pipe, PipeTransform } from "@angular/core";
import { Friend } from "./shared/friend";

@Pipe({
  name: "searchFriends"
})
export class SearchFriendsPipe implements PipeTransform {
  transform(friends: Friend[], searchText: string): any[] {
    if (!friends) return [];
    if (!searchText) return friends;
    searchText = searchText.toLowerCase();
    return friends.filter(friend => {
      return friend.username.toLowerCase().includes(searchText);
    });
  }
}
