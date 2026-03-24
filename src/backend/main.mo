import Map "mo:core/Map";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Random "mo:core/Random";
import Runtime "mo:core/Runtime";
import InviteLinksModule "invite-links/invite-links-module";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  // Include authorization component
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Initialize the invite links system state
  let inviteState = InviteLinksModule.initState();

  // Seed the shared invite code "MUSA" for all guests
  InviteLinksModule.generateInviteCode(inviteState, "MUSA");

  public type SongRequest = {
    title : Text;
    artist : Text;
    name : Text;
  };

  type ExtendedRSVP = {
    name : Text;
    email : Text;
    attending : Bool;
    dietaryRestrictions : Text;
    plusOneName : ?Text;
    plusOneDietaryRestrictions : ?Text;
  };

  let songRequests = List.empty<SongRequest>();
  let rsvps = Map.empty<Text, ExtendedRSVP>();

  // Song request endpoints
  public shared ({ caller }) func addSongRequest(title : Text, artist : Text, name : Text) : async () {
    let songRequest = {
      title;
      artist;
      name;
    };
    songRequests.add(songRequest);
  };

  public query ({ caller }) func getSongRequests() : async [SongRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view song requests");
    };
    songRequests.toArray();
  };

  // Public function for submitting RSVP using the InviteLinksModule
  public shared ({ caller }) func submitRSVP(name : Text, attending : Bool, inviteCode : Text) : async () {
    InviteLinksModule.submitRSVP(inviteState, name, attending, inviteCode);
  };

  // Admin functions for retrieving all RSVPs
  public query ({ caller }) func getAllRSVPs() : async [InviteLinksModule.RSVP] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view RSVPs");
    };
    InviteLinksModule.getAllRSVPs(inviteState);
  };

  // Admin functions for invite codes
  public shared ({ caller }) func generateInviteCode() : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can generate invite codes");
    };
    let blob = await Random.blob();
    let code = InviteLinksModule.generateUUID(blob);
    InviteLinksModule.generateInviteCode(inviteState, code);
    code;
  };

  public query ({ caller }) func getInviteCodes() : async [InviteLinksModule.InviteCode] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view invite codes");
    };
    InviteLinksModule.getInviteCodes(inviteState);
  };
};
