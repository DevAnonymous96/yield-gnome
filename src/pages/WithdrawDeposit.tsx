import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpCircle, ArrowDownCircle, Wallet, DollarSign } from "lucide-react";

const WithdrawDeposit = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Deposit & Withdraw
          </h1>
          <p className="text-muted-foreground">
            Manage your funds across different yield protocols
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance Cards */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <span>Wallet Balance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">USDC</span>
                    <span className="font-semibold">$12,450.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">USDT</span>
                    <span className="font-semibold">$8,230.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">DAI</span>
                    <span className="font-semibold">$5,670.25</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span>Deposited Balance</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Deposited</span>
                    <span className="font-semibold text-primary">$45,890.75</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Active Earnings</span>
                    <span className="font-semibold text-green-400">+$1,234.56</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Deposit/Withdraw Forms */}
          <div className="lg:col-span-2">
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle>Manage Funds</CardTitle>
                <CardDescription>
                  Deposit or withdraw funds from yield protocols
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="deposit" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="deposit" className="flex items-center space-x-2">
                      <ArrowUpCircle className="h-4 w-4" />
                      <span>Deposit</span>
                    </TabsTrigger>
                    <TabsTrigger value="withdraw" className="flex items-center space-x-2">
                      <ArrowDownCircle className="h-4 w-4" />
                      <span>Withdraw</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="deposit" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="deposit-protocol">Select Protocol</Label>
                        <Select>
                          <SelectTrigger id="deposit-protocol">
                            <SelectValue placeholder="Choose yield protocol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aave">Aave - 4.2% APY</SelectItem>
                            <SelectItem value="compound">Compound - 3.8% APY</SelectItem>
                            <SelectItem value="yearn">Yearn Finance - 5.1% APY</SelectItem>
                            <SelectItem value="curve">Curve Finance - 6.3% APY</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="deposit-token">Token</Label>
                        <Select>
                          <SelectTrigger id="deposit-token">
                            <SelectValue placeholder="Select token" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usdc">USDC</SelectItem>
                            <SelectItem value="usdt">USDT</SelectItem>
                            <SelectItem value="dai">DAI</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="deposit-amount">Amount</Label>
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder="0.00"
                          className="glass"
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>Available: $12,450.00</span>
                          <button className="text-primary hover:underline">Max</button>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="hero">
                        <ArrowUpCircle className="h-4 w-4 mr-2" />
                        Deposit Funds
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="withdraw" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="withdraw-protocol">Select Protocol</Label>
                        <Select>
                          <SelectTrigger id="withdraw-protocol">
                            <SelectValue placeholder="Choose protocol to withdraw from" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aave">Aave - $15,230.45 deposited</SelectItem>
                            <SelectItem value="compound">Compound - $12,456.78 deposited</SelectItem>
                            <SelectItem value="yearn">Yearn Finance - $18,203.52 deposited</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="withdraw-amount">Amount</Label>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="0.00"
                          className="glass"
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>Available: $15,230.45</span>
                          <button className="text-primary hover:underline">Max</button>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        <ArrowDownCircle className="h-4 w-4 mr-2" />
                        Withdraw Funds
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WithdrawDeposit;